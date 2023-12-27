/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useUpdateCourseProgressMutation } from "../../../reducers/api/courseProgressApi";

/* eslint-disable react/prop-types */
const VideoPlayer = ({
  setIsVideoPlaying,
  section = "",
  currentSectionIndex,
  setCurrentSectionIndex,
  currentSubSectionIndex,
  setCurrentSubSectionIndex,
  courseContent = "",
}) => {
  const { courseId } = useParams();
  const [updateCourseProgress] = useUpdateCourseProgressMutation();

  const handleVideoEnd = async () => {
    if (currentSubSectionIndex + 1 < section.subSection.length) {
      setCurrentSubSectionIndex(currentSubSectionIndex + 1);
    } else {
      if (currentSectionIndex + 1 < courseContent.length) {
        setCurrentSubSectionIndex(0);
        setCurrentSectionIndex(currentSectionIndex + 1);
      } else {
        setCurrentSubSectionIndex(0);
        setCurrentSectionIndex(0);
      }
    }
    await updateCourseProgress({
      courseId,
      subSectionId:
        courseContent[currentSectionIndex].subSection[currentSubSectionIndex]
          ._id,
    });
  };
  return (
    <div
      className="fixed flex top-0 left-0 w-full h-full justify-center items-center bg-opacity-40 bg-slate-500"
      onClick={() => {
        setIsVideoPlaying(false);
      }}
    >
      <div
        className="bg-white p-5 border-1 border-black w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={
            courseContent[currentSectionIndex].subSection[
              currentSubSectionIndex
            ].videoUrl
          }
          controls
          onEnded={handleVideoEnd}
        >
          Your Browser Does not Support Video Tag
        </video>
        <p className="my-2">
          {
            courseContent[currentSectionIndex].subSection[
              currentSubSectionIndex
            ].subSectionName
          }
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
