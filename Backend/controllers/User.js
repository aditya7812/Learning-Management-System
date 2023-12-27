const User = require("../models/User");

exports.getInstructorDetails = async (req, res) => {
  try {
    const instructorDetails = await User.findById(req.userInfo.userId)
      .populate("courses")
      .select("-password");
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: instructorDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
      error: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findById(req.userInfo.userId).populate({
      path: "courseProgress",
      populate: {
        path: "courseId",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      data: userDetails,
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
