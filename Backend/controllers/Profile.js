const User = require("../models/User");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
exports.editProfile = async (req, res) => {
  try {
    const { firstName, lastName, headline, biography } = req.body;
    const user = await User.findById(req.userInfo.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Fund",
      });
    }
    if (firstName && lastName && headline && biography) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.headline = headline;
      user.biography = biography;
    }

    if (req.files?.profilePicture) {
      const uploadDetails = await uploadFileToCloudinary(
        req.files.profilePicture,
        process.env.PROFILE_FOLDER_NAME
      );
      user.profilePicture = uploadDetails.secure_url;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
      error: error.message,
    });
  }
};
