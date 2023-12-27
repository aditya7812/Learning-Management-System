import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { MdLogout } from "react-icons/md";
import { useLogoutMutation } from "../reducers/api/authApi";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/logo-udemy.svg";
import Search from "../assets/images/search.png";
import BlankProfile from "../assets/images/blankProfile.webp";
import { useGetUserDetailsQuery } from "../reducers/api/userApi";

function Navbar() {
  const { data: userDetails } = useGetUserDetailsQuery();
  const [logout, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();
  const queryRef = useRef(null);
  const { isStudent, isInstructor } = useAuth();

  useEffect(() => {
    if (isSuccess) navigate("/join/login");
  }, [isSuccess, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${queryRef.current.value}`);
  };

  return (
    <div className="flex relative  justify-between mb-2 items-center z-10 p-4 px-8 ">
      <div>
        <Link to="/">
          <img src={Logo} className="w-24  block" />
        </Link>
      </div>
      <div>Categories</div>
      <form
        onSubmit={handleSubmit}
        className="relative rounded-[150px] border border-slate-500 bg-light-gray"
      >
        <button type="submit">
          <img
            src={Search}
            className="w-[16px] h-[16px] z- top-[16px] left-[12px] absolute decoration-slate-300"
          />
        </button>
        <input
          ref={queryRef}
          type="text"
          placeholder="Seach for anything"
          className="w-[670px] h-[40px] relative pl-[45px] m-1  text-base pr-[10px] bg-transparent text-[14px]"
          required
        />
      </form>
      {isInstructor ? (
        <Link to="/instructor">Instructor</Link>
      ) : (
        <Link to="/teaching">Teach on Udemy</Link>
      )}
      {isStudent ? (
        <div className="flex gap-x-10">
          <Link to="/user/my-courses">My Learning</Link>
          <Link
            to={
              isInstructor
                ? "/instructor/profile/basic-information"
                : "/user/profile/basic-information"
            }
          >
            <img
              src={
                userDetails?.profilePicture
                  ? userDetails?.profilePicture
                  : BlankProfile
              }
              alt=""
              className="w-6 border rounded-full h-6"
            />
          </Link>
          <button type="button" onClick={logout}>
            <MdLogout />
          </button>
        </div>
      ) : (
        <div className="flex gap-x-2">
          <div className="border py-2 px-4 font-medium text-[14px] border-slate-600">
            <Link to="/join/login">Log In</Link>
          </div>
          <div className="border py-2 px-4 text-[14px] font-medium border-slate-500 bg-black text-white ">
            <Link to="/join/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
