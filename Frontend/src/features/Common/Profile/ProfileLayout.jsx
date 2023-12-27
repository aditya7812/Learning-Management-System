import { Link, Outlet } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useGetUserDetailsQuery } from "../../../reducers/api/userApi";
import useAuth from "../../../hooks/useAuth";

const ProfileLayout = () => {
  const { isLoading } = useGetUserDetailsQuery();
  const { isInstructor } = useAuth();
  if (isLoading) return <Spinner />;
  return (
    <div className="px-8">
      <p className="text-3xl font-bold">Profile & Settings</p>
      <div className="flex gap-x-8 w-full border-b mt-10 pb-3">
        <p className="font-bold text-lg">
          <Link
            to={`/${
              isInstructor ? "instructor" : "user"
            }/profile/basic-information`}
          >
            Udemy Profile
          </Link>
        </p>
        <p className="font-bold text-lg">
          <Link to={`/${isInstructor ? "instructor" : "user"}/profile/photo`}>
            Profile Picture
          </Link>
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
