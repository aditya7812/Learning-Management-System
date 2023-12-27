import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import BlankProfile from "../../../assets/images/blankProfile.webp";
import { useGetInstructorDetailsQuery } from "../../../reducers/api/courseApi";
import imagePlaceholder from "../../../assets/images/imagePlaceholder.jpg";

const Dashboard = () => {
  const { data, isLoading } = useGetInstructorDetailsQuery();

  if (isLoading) {
    return <Spinner />;
  }
  const profilePicture = data?.profilePicture;
  return (
    <>
      <div className="px-8">
        <div className="flex justify-end gap-x-6 my-4">
          <Link to="/">Student</Link>
          <Link to="/instructor/profile/basic-information">
            <img
              src={profilePicture ? profilePicture : BlankProfile}
              alt=""
              className="w-6 rounded-full border h-6"
            />
          </Link>
        </div>
        <div className="justify-between flex p-16 m-16 text-lg font-bold shadow shadow-slate-600">
          <p>Jump into Course Creation</p>
          <Link
            to="/course/create"
            className="bg-fuchsia-600 text-white py-3 px-16"
          >
            Create Your Course
          </Link>
        </div>
      </div>
      <div className="mx-16 px-8">
        {data?.courses.length > 0 && (
          <p className="py-2 text-2xl font-bold">Your Courses</p>
        )}
        {data?.courses?.map((course) => {
          return (
            <div key={course._id} className="flex border my-8 gap-x-4 w-full">
              <img
                src={
                  course?.previewImage ? course?.previewImage : imagePlaceholder
                }
                alt=""
                className="w-36"
              />
              <div className="flex justify-between w-full">
                <div>
                  <p className="py-2 text-lg font-bold">{course.courseName}</p>
                  <p className="pt-2 text-sm font-bold">{course.status}</p>
                </div>
                <Link
                  to={`course/${course._id}/manage/goals`}
                  className="p-6 font-bold "
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}{" "}
      </div>
    </>
  );
};

export default Dashboard;
