import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../reducers/api/authApi";
import { setCredentials } from "../../../reducers/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  let from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const result = await login({ ...data }).unwrap();
    if (result.success) {
      dispatch(setCredentials(result.accessToken));
      navigate(from, { replace: true });
    }
  };

  return (
    <div>
      <div className="py-8 flex justify-center">
        <form
          className="w-[350px] border-b-2 border-black pb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="py-4 font-bold text-lg">Log in to your Udemy account</p>
          <div className="py-4">
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
            Log in
          </button>
        </form>
      </div>
      <Link
        to="/join/signup"
        className="text-blue-700 underline w-full text-center block"
      >
        New to udemy
      </Link>
      <Link to="/" className="pt-2 underline w-full text-center block">
        Home
      </Link>
    </div>
  );
  //{errors && <span>This field is required</span>}
};

export default Login;
