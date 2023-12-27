import { useGetFullCourseDetailsQuery } from "../../../reducers/api/courseApi";
import { useParams } from "react-router-dom";
import { IoIosStar, IoMdPlayCircle } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import { MdPeople } from "react-icons/md";
import BlankProfile from "../../../assets/images/blankProfile.webp";
import { CourseInfo } from "../../../utils/CourseInfo";
import Spinner from "../../../components/Spinner";

const InstructorInfo = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetFullCourseDetailsQuery(courseId);
  if (isLoading) {
    return <Spinner />;
  }
  const info = data?.courseDetails.instructor;
  const { studentsEnrolled, ratingAvg, ratingLength } = CourseInfo(
    info?.courses
  );

  return (
    <div className="py-2">
      <p className="text-2xl font-bold py-2">Instructor</p>
      <p className="text-indigo-700 font-bold underline text-lg">
        {info?.firstName + " " + info?.lastName}
      </p>
      <p>{info?.headline}</p>
      <div className="flex gap-x-4 py-4">
        <img
          src={info?.profilePicture ? info.profilePicture : BlankProfile}
          alt=""
          className="w-28 h-28 rounded-full"
        />
        <div>
          <p className="flex gap-x-3">
            <IoIosStar className="mt-1" /> {ratingAvg} Instructor Rating
          </p>
          <p className="flex gap-x-3 py-1">
            <SlBadge className="mt-1" /> {ratingLength} Review
          </p>
          <p className="flex gap-x-3 py-1">
            <MdPeople className="mt-1" /> {studentsEnrolled} Students
          </p>
          <p className="flex gap-x-3 py-1">
            <IoMdPlayCircle className="mt-1" /> {info?.courses.length} Courses
          </p>
        </div>
      </div>
      <p>{info?.biography}</p>
    </div>
  );
};

export default InstructorInfo;
