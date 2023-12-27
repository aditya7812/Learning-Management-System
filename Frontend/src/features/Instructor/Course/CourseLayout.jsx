import { Outlet, Link, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Spinner from "../../../components/Spinner";
import Sidebar from "./Sidebar";
import {
  useGetCourseDetailsQuery,
  usePublishCourseMutation,
} from "../../../reducers/api/courseApi";

const CourseLayout = () => {
  const params = useParams();
  const { courseId } = params;
  const { data, isLoading } = useGetCourseDetailsQuery(courseId);
  const [publishCourse, { isLoading: isPublishLoading }] =
    usePublishCourseMutation();
  const handlePublishCourse = async () => {
    await publishCourse({ courseId });
  };
  if (isLoading) {
    return <Spinner />;
  }
  let totalDuration = 0;
  data?.courseDetails.courseContent.forEach((section) => {
    section.subSection.forEach((subsection) => {
      console.log(subsection.timeDuration);
      totalDuration = totalDuration + Math.round(subsection.timeDuration);
    });
  });
  totalDuration = Math.ceil(totalDuration / 60);

  return (
    <>
      <div className="flex justify-between p-2 bg-black text-white">
        <div className="flex space-x-5">
          <Link to="/instructor" className="p-2 flex gap-x-3">
            <FaChevronLeft className="mt-1 text-lg" />
            <p>Back To Courses</p>
          </Link>
          <p className="font-bold p-2">{data?.courseDetails?.courseName}</p>
          <p className="bg-slate-600 p-1 m-1 px-2">
            {data?.courseDetails?.status}
          </p>
          <p className="p-2">{totalDuration} minutes Content Length</p>
        </div>
        <div className="flex gap-2 justify-between">
          {data?.courseDetails.status != "Published" && (
            <button
              type="button"
              disabled={isPublishLoading}
              onClick={handlePublishCourse}
              className="font-bold text-black bg-white p-2 text-lg disabled:text-slate-500"
            >
              Publish
            </button>
          )}
        </div>
      </div>
      <div className="flex my-8">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CourseLayout;
