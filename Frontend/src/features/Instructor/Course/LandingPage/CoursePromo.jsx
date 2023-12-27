/* eslint-disable react/prop-types */
import { useFormContext, Controller } from "react-hook-form";
import imagePlaceholder from "../../../../assets/images/imagePlaceholder.jpg";
import { useState } from "react";

const CoursePromo = ({ previewImage, promoVideo }) => {
  const [isAddImage, setIsAddImage] = useState(false);
  const [isAddVideo, setIsAddVideo] = useState(false);
  const { register, control } = useFormContext();
  return (
    <div>
      <label htmlFor="previewImage" className="my-3 font-bold">
        Course Image
      </label>
      <div className="py-2 flex gap-x-5">
        <img
          src={previewImage ? previewImage : imagePlaceholder}
          alt=""
          className="w-2/5"
        />

        <div className="w-3/5">
          <p>
            Upload your course image here. It must meet our course image quality
            standards to be accepted. Important guidelines: 750x422 pixels;
            .jpg, .jpeg,. gif, or .png. no text on the image.
          </p>
          {!isAddImage && previewImage ? (
            <button
              type="button"
              onClick={() => {
                setIsAddImage(true);
              }}
              className="font-bold"
            >
              Change Image
            </button>
          ) : (
            <Controller
              control={control}
              name="previewImage"
              // eslint-disable-next-line no-unused-vars
              render={({ field }) => (
                <input type="file" {...register("previewImage")} />
              )}
            />
          )}
        </div>
      </div>

      <label htmlFor="previewImage" className="my-3 font-bold">
        Promotional Video
      </label>
      <div className="py-2 flex gap-x-5">
        <div className="w-2/5">
          <video src={promoVideo}>
            Your Browser does not support video tag
          </video>
        </div>

        <div className="w-3/5">
          <p className="mb-2">
            Your promo video is a quick and compelling way for students to
            preview what they will learn in your course. Students considering
            your course are more likely to enroll if your promo video is
            well-made.
          </p>
          {!isAddVideo && promoVideo ? (
            <button
              type="button"
              onClick={() => {
                setIsAddVideo(true);
              }}
              className="font-bold"
            >
              Change
            </button>
          ) : (
            <Controller
              control={control}
              name="promoVideo"
              // eslint-disable-next-line no-unused-vars
              render={({ field }) => (
                <input type="file" {...register("promoVideo")} />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePromo;
