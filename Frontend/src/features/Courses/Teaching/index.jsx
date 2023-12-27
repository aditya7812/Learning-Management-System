import TeachingHome from "../../../assets/images/teaching-front.jpg";
import TeachYourWay from "../../../assets/images/teach-your-way.jpg";
import InspireLearners from "../../../assets/images/inspire-learners.jpg";
import GetRewarded from "../../../assets/images/get-rewarded.jpg";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddInstructorMutation } from "../../../reducers/api/authApi";

const Teaching = () => {
  const { status } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [addInstructor] = useAddInstructorMutation();
  const handleStartCLick = async () => {
    if (!status) {
      navigate("join/instructor-login", {
        state: { from: location },
        replace: true,
      });
    }
    if (status == "Instructor") {
      navigate("/instructor");
    }
    if (status == "Student") {
      const result = await addInstructor();
      if (result?.data?.success) navigate("/instructor");
    }
  };

  return (
    <div>
      <div className="h-screen overflow-hidden relative">
        <img
          src={TeachingHome}
          alt=""
          className="max-w-full w-full scale-150 pt-[85px]"
        />
        <div className="absolute top-40 left-20 w-80">
          <p className="text-5xl font-bold">Come teach with us</p>
          <p className="py-4 text-xl">
            Beacome an instructor and change lives - including your own
          </p>
          <button
            className="bg-black text-white w-full py-4 font-bold text-lg"
            onClick={handleStartCLick}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="p-8">
        <p className="text-5xl text-center font-bold py-10">
          So many reasons to start
        </p>
        <div className="flex gap-28">
          <div>
            <div className="flex justify-center">
              <img src={TeachYourWay} alt="" className="w-24 my-4" />
            </div>
            <p className="text-center font-bold text-xl">Teach Your way</p>
            <p className="text-center">
              Publish the course you want, in the way you want, and always have
              control of your own content
            </p>
          </div>
          <div>
            <div className="flex justify-center">
              <img src={InspireLearners} alt="" className="w-24 my-4" />
            </div>
            <p className="text-center font-bold text-xl">Inspire Learners</p>
            <p className="text-center">
              Teach what you know and help learners explore their interest, gain
              new skills, and advance their careers
            </p>
          </div>
          <div>
            <div className="flex justify-center">
              <img src={GetRewarded} alt="" className="w-24 my-4" />
            </div>
            <p className="text-center font-bold text-xl">Get Rewarded</p>
            <p className="text-center">
              Expand your professional network, build your expertise, and earn
              money on each paid enrollment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teaching;
