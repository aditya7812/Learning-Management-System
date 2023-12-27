/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CourseProgressCard = ({ course }) => {
  let progressVid = 0;
  let total = 0;
  course.courseId.courseContent.forEach((section) => {
    section.subSection.forEach((subsection) => {
      if (course.completedVideos.includes(subsection._id)) {
        progressVid++;
      }
      total++;
    });
  });
  let progress = 0;
  if (total > 0) {
    progress = progressVid / total;
  }

  return (
    <Link
      to={`/course/${course._id}`}
      className="w-60 block border border-black pb-2"
    >
      <img src={course.courseId.previewImage} alt="" className="w-60" />
      <p className="p-1">{course.courseId.courseName}</p>
      <p className="flex gap-x-4 px-1">
        <progress value={progress} className="text-blue-400 bg-blue-400 mt-1" />
        {progress * 100} %
      </p>
    </Link>
  );
};

export default CourseProgressCard;
