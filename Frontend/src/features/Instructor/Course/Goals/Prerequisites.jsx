import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {
  useEditCourseGoalsMutation,
  useGetCourseDetailsQuery,
} from "../../../../reducers/api/courseApi";

const Prerequisites = () => {
  const params = useParams();
  const { courseId } = params;

  const { data } = useGetCourseDetailsQuery(courseId);
  const [editCourseGoals, { isLoading }] = useEditCourseGoalsMutation();
  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      prerequisites: data?.courseDetails.prerequisites
        ? [...data.courseDetails.prerequisites]
        : [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "prerequisites",
    control,
  });

  useEffect(() => {
    data.courseDetails.prerequisites.forEach((prerequisite, index) => {
      setValue(
        `prerequisites.${index}.prerequisite`,
        prerequisite.prerequisite
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    await editCourseGoals({ data, courseId });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pr-2">
      <div className="mt-6 px-4">
        <p className="font-bold">
          What are the requirements or prerequisites for taking your course?
        </p>
        <p>
          List the required skills, experience, tools or equipment learners
          should have prior to taking your course. If there are no requirements,
          use this space as an opportunity to lower the barrier for beginners.
        </p>
        {fields.map((field, index) => {
          return (
            <div className="flex gap-x-4" key={field.id}>
              <input
                type="text"
                placeholder="Prerequisites"
                className="block border p-4 w-full border-black my-2"
                {...register(`prerequisites.${index}.prerequisite`, {
                  required: true,
                })}
              />
              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  <MdDelete className="text-2xl" />
                </button>
              )}
            </div>
          );
        })}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => append({ prerequisite: "" })}
            className="pt-4 text-purple-700 font-bold"
          >
            Add More to your Responses
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white font-bold px-3 disabled:bg-slate-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
export default Prerequisites;
