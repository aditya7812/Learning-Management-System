import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEditProfileMutation,
  useGetUserDetailsQuery,
} from "../../../reducers/api/userApi";

const ProfilePhoto = () => {
  const [inputImage, setInputImage] = useState(false);
  const { data } = useGetUserDetailsQuery();
  const [editProfile, { isLoading }] = useEditProfileMutation();
  const { register, handleSubmit, getValues, watch } = useForm();
  const pictureWatch = watch("profilePicture");
  useEffect(() => {
    setInputImage(getValues("profilePicture")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictureWatch]);

  const onSubmit = async () => {
    const profilePicture = getValues("profilePicture")[0];
    await editProfile({
      profilePicture,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Preview image</p>
      <img
        src={
          inputImage ? URL.createObjectURL(inputImage) : data?.profilePicture
        }
        alt=""
        className="w-1/4 border p-1 h-[250px]"
      />
      <input
        {...register("profilePicture", { required: true })}
        type="file"
        placeholder="Select Image"
        className="p-2 block border border-black my-2 w-1/2"
      />
      <button
        disabled={isLoading}
        className="mt-2 py-2 px-3 ml-2 bg-black text-white font-bold disabled:bg-slate-700"
      >
        Save
      </button>
    </form>
  );
};

export default ProfilePhoto;
