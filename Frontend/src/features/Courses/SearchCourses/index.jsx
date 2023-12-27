import { useSearchCoursesQuery } from "../../../reducers/api/courseApi";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import WideCourseCard from "./WideCourseCard";

const SearchCourses = () => {
  const params = useParams();
  const { query } = params;
  const { data, isLoading } = useSearchCoursesQuery(query);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="my-8 mx-60">
      <div>
        <p className="text-xl font-bold">
          {data?.courses.length} results for {query}
        </p>
      </div>
      <div className="my-8">
        {data?.courses.map((course) => {
          return <WideCourseCard key={course._id} course={course} />;
        })}
      </div>
    </div>
  );
};

export default SearchCourses;
