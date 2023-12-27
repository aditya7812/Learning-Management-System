import { useForm } from "react-hook-form";
import {
  useEditProfileMutation,
  useGetUserDetailsQuery,
} from "../../../reducers/api/userApi";

const BasicInformation = () => {
  const { data } = useGetUserDetailsQuery();
  const [editProfile] = useEditProfileMutation();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      headline: data?.headline,
      biography: data?.biography,
    },
  });
  const onSubmit = async () => {
    const firstName = getValues("firstName");
    const lastName = getValues("lastName");
    const headline = getValues("headline");
    const biography = getValues("biography");

    await editProfile({
      firstName,
      lastName,
      headline,
      biography,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full p-2 justify-between gap-x-8">
          <div className="w-full ">
            <label htmlFor="firstName" className="font-bold block py-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName", { required: true })}
              className="border p-3 w-full border-black"
            />
          </div>
          <div className="w-full">
            <label htmlFor="lastName" className="font-bold block py-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName", { required: true })}
              className="border p-3 w-full border-black"
            />
          </div>
        </div>
        <div className="flex w-full p-2 justify-between gap-x-8">
          <div className="w-full">
            <label htmlFor="headline" className="font-bold block py-2">
              Headline{" "}
            </label>
            <input
              id="headline"
              type="text"
              {...register("headline", { required: true })}
              placeholder="Instructor at Udemy"
              className="border p-3 w-full border-black"
            />
          </div>
          <div className="w-full">
            <label htmlFor="biography" className="font-bold block py-2">
              Biography{" "}
            </label>
            <input
              id="biography"
              type="text"
              {...register("biography", { required: true })}
              className="border p-3 w-full border-black"
            />
          </div>
        </div>
        <button className="mt-4 py-2 px-3 ml-2 bg-black text-white font-bold">
          Save
        </button>
      </form>
    </div>
  );
};

export default BasicInformation;
