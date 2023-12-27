/* eslint-disable react/prop-types */
import { CourseInfo } from "../../../utils/CourseInfo";
import { Link } from "react-router-dom";
import { Rating, ThinStar } from "@smastrom/react-rating";
const ratingStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#cfb700",
  inactiveFillColor: "#fbf1a9",
};

const CourseCard = ({ course }) => {
  const { ratingAvg, ratingLength } = CourseInfo([course]);

  return (
    <div key={course?._id}>
      <Link to={`course/${course._id}`}>
        <img
          src={course?.previewImage}
          alt=""
          className="border-black border"
        />
        <p className="font-bold text-lg leading-5 py-2">{course?.courseName}</p>
        <p className="text-sm text-slate-500 ">
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </p>
        <div className="flex gap-x-2">
          <span className="text-sm font-bold">{ratingAvg}</span>
          <Rating
            readOnly
            className="w-1/3 "
            value={ratingAvg}
            itemStyles={ratingStyles}
          />
          <p className="text-sm text-slate-500">({ratingLength})</p>
        </div>
        <p>{course?.price > 0 ? "₹ " + course?.price : "FREE"}</p>
      </Link>
    </div>
  );
};

export default CourseCard;
