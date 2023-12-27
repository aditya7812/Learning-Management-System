/* eslint-disable react/prop-types */
import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import { useAddSubSectionContentMutation } from "../../../../reducers/api/courseApi";

const AddContent = ({
  setIsAddNewContent,
  videoUrl,
  subSectionId,
  videoName,
  date,
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [isReplaceContent, setIsReplaceContent] = useState(false);
  const [addSubSectionContent] = useAddSubSectionContentMutation();
  const { setValue, resetField, control, register, getValues } =
    useFormContext();
  const handleFileChange = (e) => {
    // When a new file is selected, update the form state
    setValue("file", e.target.files);
  };

  const handleUploadContent = async () => {
    setIsloading(true);

    const file = getValues("file")[0];
    await addSubSectionContent({
      subSectionId,
      file,
    });

    setIsAddNewContent(false);
    setIsReplaceContent(false);
    setIsloading(false);
  };

  const handleCancel = () => {
    setIsAddNewContent(false);
    setIsReplaceContent(false);
    resetField("file");
  };

  return (
    <div className="border border-black m-2 p-2">
      {videoUrl && !isReplaceContent ? (
        <div>
          <div className="flex justify-between mx-2">
            <table>
              <thead>
                <tr className="mb-4 border-b">
                  <th className="max-w-[500px] break-words px-2 text-start">
                    Name
                  </th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="max-w-[500px] break-words px-2 mt-4">
                    {videoName}
                  </td>
                  <td className="pl-4">{date}</td>
                </tr>
              </tbody>
            </table>
            <button
              className="font-bold"
              onClick={() => {
                setIsReplaceContent(true);
              }}
            >
              Replace
            </button>
          </div>
        </div>
      ) : (
        <>
          <label>
            File:{" "}
            <Controller
              control={control}
              name="file"
              // eslint-disable-next-line no-unused-vars
              render={({ field }) => (
                <input
                  type="file"
                  onChange={handleFileChange}
                  {...register("file")}
                />
              )}
            />
          </label>

          <div className="flex gap-4  pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className=" py-1 px-2 font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-black text-white py-1 px-2 font-bold disabled:bg-slate-500"
              onClick={handleUploadContent}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default AddContent;
