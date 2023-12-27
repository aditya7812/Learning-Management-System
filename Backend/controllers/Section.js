const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.getAllSections = async (req, res) => {
  const sections = await Section.find().populate("subSection").exec();
  return res.json({
    success: true,
    data: sections,
    message: "Success",
  });
};

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Section created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;
    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Section Updated SUCCESSFULLY!",
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    console.log(req.body);
    const { deleteSectionId, courseId } = req.body;
    const sectionId = deleteSectionId;
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not Found",
      });
    }

    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Section deleted",
      data: course,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
