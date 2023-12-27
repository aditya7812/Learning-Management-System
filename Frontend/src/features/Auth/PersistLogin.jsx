import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../components/Spinner";
import { useRefreshMutation } from "../../reducers/api/authApi";

const PersistLogin = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const effectRan = useRef(false);
  const [success, setSuccess] = useState(false);
  const [refresh, { isLoading, isError, isSuccess, isUninitialized }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    if (location.pathname == "/") {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  }
  if (success && isSuccess) {
    return <Outlet />;
  }
  if (token && isUninitialized) {
    return <Outlet />;
  }
};

export default PersistLogin;
