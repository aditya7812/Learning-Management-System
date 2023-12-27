/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { CourseInfo } from "../../../utils/CourseInfo";
import { Rating } from "@smastrom/react-rating";

const WideCourseCard = ({ course }) => {
  const { ratingAvg, ratingLength } = CourseInfo([course]);

  return (
    <Link
      to={`/course/${course._id}`}
      className="flex gap-x-6 my-4 border border-black"
    >
      <img src={course.previewImage} alt="" className="w-60" />
      <div className="flex justify-between ">
        <div className="w-3/4">
          <p className="text-xl font-bold">{course.courseName}</p>
          <p>{course.courseSubtitle}</p>
          <p>
            {course.instructor.firstName} {course.instructor.lastName}
          </p>
          <p className="flex gap-x-2">
            <p className="font-bold">{ratingAvg}</p>
            <Rating readOnly value={ratingAvg} className="w-20" />
            <p className="text-gray-500">({ratingLength})</p>
          </p>
          <p className="text-sm">{course.instructionalLevel} Level</p>
        </div>
        <div className="py-4 font-bold text-xl pr-2">
          {course.price == 0 ? "FREE " : "₹  " + course.price}
        </div>
      </div>
    </Link>
  );
};

export default WideCourseCard;
