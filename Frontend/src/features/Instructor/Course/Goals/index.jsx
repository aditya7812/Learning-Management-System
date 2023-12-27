import LearningObjectives from "./LearningObjectives";
import Prerequisites from "./Prerequisites";

const CourseGoals = () => {
  return (
    <div className="">
      <p className="text-2xl font-bold pb-5 border-b-2">Intended Learners</p>
      <div>
        <p>
          The following descriptions will be publicly visible on your Course
          Landing Page and will have a direct impact on your course performance.
          These descriptions will help learners decide if your course is right
          for them.
        </p>
        <LearningObjectives />
        <Prerequisites />
      </div>
    </div>
  );
};

export default CourseGoals;
