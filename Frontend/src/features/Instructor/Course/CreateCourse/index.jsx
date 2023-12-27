import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "../../../../reducers/api/courseApi";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [createCourse, { loading }] = useCreateCourseMutation();

  const onSubmit = async (data) => {
    try {
      const result = await createCourse(data).unwrap();
      navigate(`/instructor/course/${result.data._id}/manage/basics`);

      //dispatch(setCredentials({ accessToken }))
      //navigate('/home')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center">
      {loading && <p>Loading</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 my-40">
        <p className=" text-3xl font-bold">
          Give working title to course and choose category
        </p>
        <p className=" text-sm text-gray-600 pb-8">
          Don't worry you can change it later
        </p>
        <div>
          <label htmlFor="courseName" className="font-bold">
            Course Name
          </label>
          <input
            id="courseName"
            type="text"
            placeholder="e.g. Learn Javascript in 60 Days "
            className="block border p-4 w-full border-black my-2"
            {...register("courseName", { required: true })}
          />
        </div>
        <div className="py-5">
          <p className="pb-2 font-bold">Category</p>
          <select
            name="Choose Category"
            {...register("category", { required: true })}
            className="border border-black p-2"
          >
            <option value="">Choose Category</option>
            <option value="Development">Development</option>
            <option value="Business">Business</option>
            <option value="Finance">Finance</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Design">Design</option>
            <option value="Personal Development">Personal Development</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-purple-600 py-3 font-bold"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
