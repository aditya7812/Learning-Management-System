import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useGetUserDetailsQuery } from "../../../reducers/api/userApi";
import CourseProgressCard from "./CourseProgressCard";

const MyCourses = () => {
  const { data, isLoading } = useGetUserDetailsQuery();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="w-full bg-black text-white font-bold text-4xl flex justify-center py-12">
        <p>My Courses</p>
      </div>
      {!data?.courseProgress.length ? (
        <Link
          to="/"
          className="my-8 mx-96 flex justify-center font-bold text-xl border border-black p-4"
        >
          Browse New Courses
        </Link>
      ) : (
        <div className="m-12 flex gap-x-8">
          {data?.courseProgress.map((course) => {
            return <CourseProgressCard key={course._id} course={course} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
