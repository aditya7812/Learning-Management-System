import { useGetCategoryCoursesQuery } from "../../../reducers/api/courseApi";
import Spinner from "../../../components/Spinner";
import CourseCard from "./CourseCard";

const Section = () => {
  const { data, isLoading } = useGetCategoryCoursesQuery("Development");
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-5 gap-x-8">
      {data?.map((course, index) => {
        return <CourseCard key={index} course={course} />;
      })}
    </div>
  );
};

export default Section;
