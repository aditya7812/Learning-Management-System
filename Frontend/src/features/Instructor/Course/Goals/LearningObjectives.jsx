import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {
  useEditCourseGoalsMutation,
  useGetCourseDetailsQuery,
} from "../../../../reducers/api/courseApi";

const LearningObjectives = () => {
  const params = useParams();
  const { courseId } = params;

  const { data } = useGetCourseDetailsQuery(courseId);
  const [editCourseGoals, { isLoading }] = useEditCourseGoalsMutation();

  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      learningObjectives: data?.courseDetails.learningObjectives
        ? [...data.courseDetails.learningObjectives]
        : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "learningObjectives",
    control,
  });

  useEffect(() => {
    data.courseDetails.learningObjectives.forEach((goal, index) => {
      setValue(`learningObjectives.${index}.objective`, goal.objective);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    await editCourseGoals({ data, courseId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pr-2">
      <div className="mt-6 px-4">
        <p className="font-bold">What will students learn in your course?</p>
        <p>
          Enter learning objectives or outcomes that learners can expect to
          achieve after completing your course.
        </p>
        {fields.map((field, index) => {
          return (
            <div className="flex gap-x-4" key={field.id}>
              <input
                type="text"
                placeholder="Objectives"
                className="block border p-4 w-full border-black my-2"
                {...register(`learningObjectives.${index}.objective`, {
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
            onClick={() => append({ objective: "" })}
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

export default LearningObjectives;
