import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentToken } from "../reducers/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isStudent = false;
  let isInstructor = false;
  let status = "";
  if (token) {
    const decoded = jwtDecode(token);
    const { userId, roles } = decoded.userInfo;
    isStudent = roles?.includes("Student");
    isInstructor = roles?.includes("Instructor");
    if (isStudent) status = "Student";
    if (isInstructor) status = "Instructor";
    return { userId, roles, status, isStudent, isInstructor };
  }
  return { userId: "", roles: [], isStudent, isInstructor, status };
};

export default useAuth;
