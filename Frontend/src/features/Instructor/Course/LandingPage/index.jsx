import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useIsMount } from "./useIsMount";
import CoursePromo from "./CoursePromo";
import {
  useEditCourseBasicsMutation,
  useGetCourseDetailsQuery,
} from "../../../../reducers/api/courseApi";
import { categories } from "../../../../data/categories";
import { PRICE_TIER } from "../../../../data/priceTier";

const locales = ["English", "German", "French", "Spanish", "Hindi", "Marathi"];
const instructionaleLevel = ["Beginner", "Medium", "Advanced", "All"];

const LandingPage = () => {
  const isMount = useIsMount();
  const params = useParams();
  const { courseId } = params;
  const { data } = useGetCourseDetailsQuery(courseId);
  const [editCourseBasics] = useEditCourseBasicsMutation();

  const [subCategories, setSubCategories] = useState(
    data?.courseDetails?.category
      ? categories?.find((category) => category[data?.courseDetails?.category])[
          data?.courseDetails?.category
        ]
      : []
  );
  const methods = useForm({
    defaultValues: {
      courseName: data.courseDetails?.courseName,
      courseSubtitle: data.courseDetails?.courseSubtitle,
      description: data.courseDetails?.description,
      locale: data.courseDetails?.locale,
      instructionalLevel: data.courseDetails?.instructionalLevel,
      category: data.courseDetails?.category,
      subCategory: data.courseDetails?.subCategory,
      price: data.courseDetails?.price,
      previewImage: "",
      promoVideo: "",
    },
  });
  const { register, handleSubmit, formState, getValues, watch } = methods;
  const watchCategory = watch("category");
  const { isDirty } = formState;
  useEffect(() => {
    if (!isMount) {
      const selectedCategoryObject = categories.find(
        (category) => category[getValues("category")]
      );
      setSubCategories(
        selectedCategoryObject
          ? selectedCategoryObject[getValues("category")]
          : []
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCategory]);

  const onSubmit = async () => {
    //const formData = new FormData();
    const courseName = getValues("courseName");
    const courseSubtitle = getValues("courseSubtitle");
    const description = getValues("description");
    const locale = getValues("locale");
    const instructionalLevel = getValues("instructionalLevel");
    const category = getValues("category");
    const subCategory = getValues("subCategory");
    const price = getValues("price");
    const previewImage = getValues("previewImage")[0]
      ? getValues("previewImage")[0]
      : null;
    const promoVideo = getValues("promoVideo")
      ? getValues("promoVideo")[0]
      : null;
    await editCourseBasics({
      courseId,
      courseName,
      courseSubtitle,
      description,
      locale,
      instructionalLevel,
      category,
      subCategory,
      price,
      previewImage,
      promoVideo,
    });
  };
  return (
    <div className="shadow-md mr-4">
      <FormProvider {...methods}>
        <form className="px-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <p className="text-2xl font-bold py-6 border-b">
              Course Landing Page
            </p>
            <button
              type="submit"
              disabled={!isDirty}
              className="bg-black text-white font-bold disabled:bg-slate-500 my-5 px-3"
            >
              Save
            </button>
          </div>
          <p className="py-8">
            Your course landing page is crucial to your success on Udemy. If its
            done right, it can also help you gain visibility in search engines
            like Google. As you complete this section, think about creating a
            compelling Course Landing Page that demonstrates why someone would
            want to enroll in your course. Learn more about creating your course
            landing page and course title standards.
          </p>
          <label htmlFor="courseName" className="font-bold py-2">
            Course Title
          </label>
          <input
            id="courseName"
            className="block my-2 border p-3 w-full border-black"
            placeholder="Title"
            {...register("courseName", { required: true, maxLength: 50 })}
          />
          <p className="text-slate-400 mb-2 text-sm">
            Your title should be a mix of attention-grabbing, informative, and
            optimized for search
          </p>

          <label htmlFor="courseSubtitle" className="font-bold py-2">
            Course Subtitle
          </label>
          <input
            id="courseSubtitle"
            className="block my-2 border p-3 w-full border-black"
            placeholder="Subtitle"
            {...register("courseSubtitle", { required: true, maxLength: 150 })}
          />
          <p className="text-slate-400 mb-2 text-sm">
            Use 1 or 2 related keywords, and mention 3-4 of the most important
            areas that you have covered during your course.
          </p>

          <label htmlFor="description" className="font-bold py-2">
            Course Description
          </label>
          <input
            id="description"
            className="block my-2 border p-3 w-full border-black"
            placeholder="Description"
            {...register("description", {
              required: true,
              maxLength: 1000,
              minLength: 50,
            })}
          />
          <p className="text-slate-400 mb-2 text-sm">
            Description should have minimum 50 words.
          </p>

          <h2 className="font-bold">Basic Info</h2>
          <div className="flex gap-x-4 pt-2">
            <select
              {...register("locale", { required: true })}
              className="border p-2 border-black w-1/3"
            >
              <option value="">Choose Locale</option>
              {locales.map((locale) => {
                return (
                  <option value={locale} key={locale}>
                    {locale}
                  </option>
                );
              })}
            </select>

            <select
              {...register("instructionalLevel", { required: true })}
              className="border p-2 border-black w-1/3"
            >
              <option value="">Choose Level</option>
              {instructionaleLevel.map((level) => {
                return (
                  <option value={level} key={level}>
                    {level} Level
                  </option>
                );
              })}
            </select>
            <select
              {...register("category", { required: true })}
              className="border p-2 border-black w-1/3"
            >
              <option value="">Choose Category</option>
              {categories.map((category) => {
                return (
                  <option
                    value={Object.keys(category)[0]}
                    key={Object.keys(category)[0]}
                  >
                    {Object.keys(category)[0]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-full flex justify-end pl-8 mt-4">
            <select
              {...register("subCategory", { required: true })}
              className="border p-2 border-black w-1/3 "
            >
              <option value="">Choose SubCategory</option>
              {subCategories.map((subCategory) => {
                return (
                  <option value={subCategory} key={subCategory}>
                    {subCategory}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <p className="font-bold mb-1">Price</p>
            <select
              {...register("price", { required: true })}
              className="border p-2 border-black w-1/3 mb-2"
            >
              <option value="">Choose Price</option>
              {PRICE_TIER.map((tier) => {
                return (
                  <option
                    value={Object.values(tier)[0]}
                    key={Object.values(tier)[0]}
                  >
                    {Object.keys(tier)[0]}
                  </option>
                );
              })}
            </select>
          </div>

          <CoursePromo
            previewImage={data.courseDetails.previewImage}
            promoVideo={data.courseDetails.promoVideo}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default LandingPage;
