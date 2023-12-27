/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCreateRatingMutation,
  useEditRatingMutation,
} from "../../../reducers/api/ratingAndReview";
import { useGetFullCourseDetailsQuery } from "../../../reducers/api/courseApi";
import Spinner from "../../../components/Spinner";

import useAuth from "../../../hooks/useAuth";

const RatingAndReview = ({ rating = 0, review = "" }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetFullCourseDetailsQuery(courseId);
  const { userId } = useAuth();
  const [inputRating, setInputRating] = useState(rating);
  const [inputReview, setInputReview] = useState(review);
  const [isEditRating, setIsEditRating] = useState(false);
  const [createRating] = useCreateRatingMutation();
  const [editRating] = useEditRatingMutation();
  if (isLoading) {
    return <Spinner />;
  }

  let userRating;
  if (data?.courseDetails?.studentsEnrolled?.includes(userId)) {
    userRating = data?.courseDetails?.ratingAndReviews?.find(
      (rating) => rating?.user._id == userId
    );
  }

  const handleRating = (e) => {
    setInputRating(e);
  };

  const handleReview = (e) => {
    setInputReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rating = inputRating;
    const review = inputReview;
    if (!isEditRating) {
      await createRating({ courseId, rating, review });
    } else {
      await editRating({ courseId, rating, review });

      setIsEditRating(false);
    }
  };

  return (
    <div>
      <div>
        {data?.courseDetails?.studentsEnrolled?.includes(userId) ? (
          userRating && !isEditRating ? (
            <div>
              <p className="text-xl font-bold py-2">Your Review</p>
              <div className="border p-3 border-black">
                <div className="flex gap-x-2 text-sm">
                  <Rating
                    readOnly
                    value={userRating?.rating}
                    className="w-24"
                  />
                  <p>{userRating.updatedAt.substring(0, 10)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="py-1">{userRating?.review}</p>
                  <button
                    type="button"
                    className="font-bold text-blue-700"
                    onClick={() => {
                      setIsEditRating(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-xl font-bold">Rate this course</p>
              <p>Tell others what you think</p>
              <Rating
                value={inputRating}
                onChange={handleRating}
                className="w-40 py-4"
                isRequired
              />
              <input
                type="text"
                value={inputReview}
                onChange={handleReview}
                placeholder="Describe your exprerience (optional)"
                className="border w-full boder-black p-2"
              />
              <button className="mt-3 font-bold text-blue-800">Submit</button>
            </form>
          )
        ) : null}
      </div>
      <div className="my-6">
        <p className="text-2xl font-bold pb-3">Reviews</p>
        {data?.courseDetails.ratingAndReviews.map((rating) => {
          return (
            <div
              className="p-2 pb-4 border-b border-neutral-600"
              key={rating._id}
            >
              <p className="font-bold">
                {rating.user.firstName + " " + rating.user.lastName}
              </p>
              <div className="flex gap-x-2">
                <Rating readOnly value={rating.rating} className="w-20" />
                <p className="text-sm">{rating.updatedAt?.substring(0, 10)}</p>
              </div>
              <p>{rating.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingAndReview;
