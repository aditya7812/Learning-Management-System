const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.userInfo.userId;
  try {
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection Not Found",
      });
    }
    const courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course Progress Not Found",
      });
    }

    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(400).json({
        success: false,
        message: "Already Completed",
      });
    }

    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "SubSection Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
    });
  }
};

exports.getUserCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: req.userInfo.userId,
    }).populate("userId");

    return res.json({
      userProgress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Error Occured",
    });
  }
};
