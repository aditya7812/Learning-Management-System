const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionName } = req.body;
    console.log(sectionId, subSectionName);

    if (!sectionId || !subSectionName) {
      return res.status(400).json({
        success: false,
        message: "all fields are REQUIRED !!",
      });
    }

    const subSectionDetails = await SubSection.create({
      subSectionName,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      {
        new: true,
      }
    ).populate("subSection");

    //sending.. final response
    return res.status(200).json({
      success: true,
      message: "subSection created SUCCESSFULLY !",
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "an error ocurred while creating sub-Section!",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, subSectionName } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (subSectionName !== undefined) {
      subSection.subSectionName = subSectionName;
    }

    await subSection.save();

    return res.json({
      success: true,
      message: "Section updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.json({
      success: true,
      data: updatedSection,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
};

exports.addSubSectionContent = async (req, res) => {
  try {
    const { subSectionId } = req.body;
    const subSection = await SubSection.findById(subSectionId);
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Fields not found",
      });
    }
    if (!req.files || req.files.videoFile == undefined) {
      return res.status(404).json({
        success: false,
        message: "Video Not Found",
      });
    }
    const uploadDetails = await uploadFileToCloudinary(
      req.files.videoFile,
      process.env.FOLDER_NAME
    );
    await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        videoUrl: uploadDetails.secure_url,
        timeDuration: uploadDetails.duration,
        videoDate: uploadDetails.created_at,
        videoName: req.files.videoFile.name,
      },
      { new: true }
    );
    return res.json({
      success: true,
      message: "Video Uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while uploding video",
    });
  }
};
