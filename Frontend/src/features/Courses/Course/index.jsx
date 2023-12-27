import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuMonitorPlay } from "react-icons/lu";
import { AiOutlineTrophy } from "react-icons/ai";
import { SlGlobe } from "react-icons/sl";
import { Rating } from "@smastrom/react-rating";
import CourseProgress from "./CourseProgress";
import Spinner from "../../../components/Spinner";
import Checkout from "./Checkout";
import RatingAndReview from "./RatingAndReview";
import VideoPlayer from "./VideoPlayer";
import { useGetUserProgressQuery } from "../../../reducers/api/courseProgressApi";
import { useGetFullCourseDetailsQuery } from "../../../reducers/api/courseApi";
import useAuth from "../../../hooks/useAuth";
import InstructorInfo from "./InstructorInfo";

const Course = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetFullCourseDetailsQuery(courseId);
  const { data: courseProgress } = useGetUserProgressQuery(courseId);
  const { userId } = useAuth();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);
  const [currentSubSectionIndex, setCurrentSubSectionIndex] = useState(-1);

  if (isLoading) {
    return <Spinner />;
  }
  let userRating;
  if (data?.courseDetails?.studentsEnrolled?.includes(userId)) {
    userRating = data?.courseDetails?.ratingAndReviews?.find(
      (rating) => rating.user == userId
    );
  }
  let ratingSum = 0;
  let ratingAverage = 0;
  if (data?.courseDetails.ratingAndReviews.length > 0) {
    data?.courseDetails.ratingAndReviews.forEach((rating) => {
      ratingSum += rating.rating;
    });
    ratingAverage = ratingSum / data?.courseDetails.ratingAndReviews.length;
  }

  let totalDuration = 0;
  data?.courseDetails.courseContent.forEach((section) => {
    section.subSection.forEach((subsection) => {
      totalDuration = totalDuration + Math.round(subsection.timeDuration);
    });
  });
  totalDuration = Math.ceil(totalDuration / 60);

  let numberOfSubSections = 0;
  data?.courseDetails.courseContent.forEach((section) => {
    section.subSection.forEach(() => {
      numberOfSubSections++;
    });
  });

  return (
    <div>
      <div className="py-8">
        <div className="flex relative">
          <div className="bg-slate-800 px-20 py-6 w-full">
            <div className="w-2/3">
              <div className="flex gap-x-2">
                <div className="font-bold text-indigo-400">
                  <Link to="/courses/id">{data?.courseDetails?.category}</Link>
                </div>
                <div className="font-bold text-white">&#x1F892;</div>
                <div className="font-bold text-indigo-400">
                  <Link to="course/category/subctegory/">
                    {data?.courseDetails?.subCategory}
                  </Link>
                </div>
              </div>
              <p className="text-4xl font-bold py-4 text-white">
                {data?.courseDetails?.courseName}
              </p>
              <p className="text-lg text-white pb-4">
                {data?.courseDetails?.courseSubtitle}
              </p>
              <div className="flex gap-x-2 py-1">
                <p className="bg-amber-200 text text-yellow-800 p-1 text-sm font-bold">
                  Best Seller
                </p>
                <div className="text-white flex gap-x-2">
                  <p className="text-yellow-500 font-bold">{ratingAverage}</p>
                  {<Rating readOnly value={ratingAverage} className="w-24" />}
                </div>
                <div className="text-indigo-400 underline">
                  {"("}
                  {data?.courseDetails.ratingAndReviews.length} ratings{")"}
                </div>
                <div className="text-white">
                  {data?.courseDetails.studentsEnrolled.length} students
                </div>
              </div>
              <div className="flex gap-x-3">
                <span className="text-white">Created by</span>{" "}
                <span className="text-indigo-400 underline">
                  {data?.courseDetails?.instructor?.firstName}{" "}
                  {data?.courseDetails?.instructor?.lastName}
                </span>
              </div>
              <div className="flex gap-x-20 text-white">
                <div>
                  <p>
                    Last updated{" "}
                    {data?.courseDetails?.updatedAt.substring(0, 10)}
                  </p>
                </div>
                <div className="flex gap-x-3">
                  <SlGlobe className="mt-1 text-lg" />
                  <p>{data?.courseDetails?.locale}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 border border-black right-40 p-2 w-80 bg-white">
            <video src={data?.courseDetails?.promoVideo} controls>
              Your Browser does not support video tag
            </video>
            {!courseProgress?.userProgress ? (
              <div>
                <p className="font-bold border-b py-3 text-center text-lg">
                  Personal
                </p>
                <p className="font-bold text-2xl py-3 pl-2">
                  {data?.courseDetails?.price > 0
                    ? "₹ " + data?.courseDetails?.price
                    : "FREE"}
                </p>
                <Checkout />
              </div>
            ) : (
              <CourseProgress />
            )}
          </div>
        </div>
        <div className="px-20 py-5 w-2/3">
          <div className="my-5 p-4 border-neutral-400 border">
            <p className="font-bold text-2xl px-2 py-4">What you learn</p>
            <ul className="list-outside list-disc grid grid-cols-2 px-6 gap-x-4">
              {data?.courseDetails?.learningObjectives.map(
                (objective, index) => {
                  return <li key={index}>{objective.objective}</li>;
                }
              )}
            </ul>
          </div>
          <div>
            <p className="text-2xl font-bold py-2">This course includes :</p>
            <div className="grid grid-cols-2 justify-between">
              <div className="flex gap-x-2">
                <LuMonitorPlay className="mt-2 text-xl" />
                <p className="text-lg pt-1">
                  {totalDuration} minutes on-demond video
                </p>
              </div>
              <div className="flex gap-x-2">
                <AiOutlineTrophy className="mt-2 text-lg" />
                <p className="text-lg pt-1">Certificate of completion</p>
              </div>
            </div>
          </div>
          <div className="my-2">
            <p className="text-2xl font-bold py-4">Course content</p>
            <div className="flex gap-x-2">
              <span>{data?.courseDetails?.courseContent?.length} sections</span>
              <span>{numberOfSubSections} lectures</span>
            </div>
            <div>
              {data?.courseDetails?.courseContent.map(
                (section, sectionIndex) => {
                  return (
                    <div
                      key={sectionIndex}
                      className="my-2 border border-zinc-700"
                    >
                      <p className="font-bold py-3 border-b border-zinc-600 bg-slate-200 px-4">
                        {section?.sectionName}
                      </p>
                      {section.subSection.map((subsection, subindex) => {
                        return (
                          <>
                            <div
                              className="flex gap-x-4 px-4 py-2"
                              key={subsection._id}
                            >
                              <LuMonitorPlay className="mt-1 text-lg" />
                              <p className=" underline text-violet-700">
                                <button
                                  disabled={!courseProgress.userProgress}
                                  onClick={() => {
                                    setCurrentSectionIndex(sectionIndex);
                                    setCurrentSubSectionIndex(subindex);

                                    setIsVideoPlaying(true);
                                  }}
                                >
                                  {subsection?.subSectionName}
                                </button>
                              </p>
                            </div>
                            {isVideoPlaying &&
                              currentSectionIndex == sectionIndex &&
                              currentSubSectionIndex == subindex && (
                                <VideoPlayer
                                  setIsVideoPlaying={setIsVideoPlaying}
                                  subSection={subsection}
                                  section={section}
                                  currentSectionIndex={currentSectionIndex}
                                  currentSubSectionIndex={
                                    currentSubSectionIndex
                                  }
                                  setCurrentSectionIndex={
                                    setCurrentSectionIndex
                                  }
                                  setCurrentSubSectionIndex={
                                    setCurrentSubSectionIndex
                                  }
                                  courseContent={
                                    data?.courseDetails?.courseContent
                                  }
                                />
                              )}
                          </>
                        );
                      })}
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="py-4">
            <p className="text-2xl font-bold">Requirements</p>
            <ul className="list-outside list-disc px-4 py-3">
              {data?.courseDetails?.prerequisites.map((prerequisite) => {
                return (
                  <li key={prerequisite._id}>{prerequisite.prerequisite}</li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="text-2xl font-bold"> Description</p>
            <p className="py-1">{data?.courseDetails?.description}</p>
          </div>
          <InstructorInfo />
          <div className="py-4">
            <RatingAndReview
              rating={userRating?.rating}
              review={userRating?.review}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
