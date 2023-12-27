import { Link, useParams } from "react-router-dom";
import { useEnrollStudentQuery } from "../../../reducers/api/paymentApi";
import Spinner from "../../../components/Spinner";

const Success = () => {
  const { sessionId } = useParams();
  const { data, isLoading } = useEnrollStudentQuery(sessionId);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="w-full h-96 flex flex-wrap justify-center content-center">
        <div className="text-center border border-black p-4">
          <p className="text-2xl">
            {data?.success
              ? "You Have Successfully Enrolled For This Course"
              : "An Error Occured"}
          </p>
          <div className="pt-16 flex gap-x-32 text-xl">
            <Link
              to="/user/courses"
              className="font-bold bg-black text-white p-2"
            >
              View Purchased Courses
            </Link>
            <Link to="/" className="font-bold border border-black p-2">
              Browse Other Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
