/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../../reducers/api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ roles }) => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const result = await signup({ roles, ...data }).unwrap();

    if (result.success) {
      navigate("/join/login", { replace: true });
    }
  };

  return (
    <div>
      <div className="py-8 flex justify-center">
        <form
          className="w-96 border-b-2 border-black pb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="py-4 font-bold text-lg">Become a Udemy instructor</p>
          <p className="text-sm">
            Discover a supportive community of online instructors. Get instant
            access to all course creation resources.
          </p>
          <div className="py-4">
            <input
              type="text"
              placeholder="Full name"
              className="block border p-4 w-full border-black my-2"
              {...register("fullName", { required: true })}
            />
            <input
              type="text"
              placeholder="Email"
              className="block border p-4 w-full border-black my-2"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              placeholder="Password"
              className="block border p-4 w-full border-black my-2"
              {...register("password", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-purple-600 py-3 font-bold"
          >
            Sign Up
          </button>
        </form>
      </div>
      <Link
        to="/join/login"
        className="text-blue-700 underline  w-full text-center block"
      >
        Already have account
      </Link>
    </div>
  );
  //{errors && <span>This field is required</span>}
};

export default Signup;
