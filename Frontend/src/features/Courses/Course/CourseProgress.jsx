import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import ClaimCertificate from "./ClaimCertificate";
import { useGetFullCourseDetailsQuery } from "../../../reducers/api/courseApi";
import { useGetUserProgressQuery } from "../../../reducers/api/courseProgressApi";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetFullCourseDetailsQuery(courseId);
  const { data: courseProgress } = useGetUserProgressQuery(courseId);
  if (isLoading) {
    return <Spinner />;
  }
  let totalContent = 0;
  let userContent = 0;
  data?.courseDetails.courseContent.forEach((section) => {
    section?.subSection?.forEach((subsection) => {
      if (
        courseProgress?.userProgress?.completedVideos.includes(subsection?._id)
      ) {
        userContent++;
      }
      totalContent++;
    });
  });

  return (
    <div>
      <p className="font-bold py-2">Course Progress</p>
      <div className="flex gap-x-2">
        <progress value={userContent / totalContent} className="w-4/5 mt-1" />
        <p className="font-bold">
          {Math.round((userContent / totalContent) * 100)} %
        </p>
      </div>
      {/* If Progress is 100% Then Claim Certificate */}
      {userContent / totalContent == 1 && (
        <ClaimCertificate
          courseName={data?.courseDetails?.courseName}
          userName={
            courseProgress?.userProgress?.userId?.firstName +
            " " +
            courseProgress?.userProgress?.userId?.lastName
          }
        />
      )}
    </div>
  );
};

export default CourseProgress;
