const Course = require("../models/Course");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    let { courseName, category } = req.body;
    if (!courseName || !category) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    const newCourse = await Course.create({
      courseName,
      category: category,
      instructor: req.userInfo.userId,
      status: "Draft",
    });

    await User.findByIdAndUpdate(
      {
        _id: req.userInfo.userId,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.handleEditGoals = async (req, res) => {
  try {
    const { data, courseId } = req.body;
    const { learningObjectives, prerequisites } = data;
    if (learningObjectives?.length == 0 && prerequisites?.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Empty Data",
      });
    }

    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    if (learningObjectives && learningObjectives.length != 0) {
      courseDetails.learningObjectives = learningObjectives;
    }
    if (prerequisites && prerequisites.length != 0) {
      courseDetails.prerequisites = prerequisites;
    }
    courseDetails.save();

    return res.status(200).json({
      success: true,
      message: "Goals Updated Successfuly",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to edit goals",
      error: error.message,
    });
  }
};

exports.handleEditBasics = async (req, res) => {
  try {
    const {
      courseName,
      courseSubtitle,
      description,
      locale,
      instructionalLevel,
      category,
      subCategory,
      price,
      courseId,
    } = req.body;
    const promoVideo = req.files?.promoVideo;
    const previewImage = req.files?.previewImage;
    if (
      !courseId ||
      !courseName ||
      !courseSubtitle ||
      !description ||
      !locale ||
      !instructionalLevel ||
      !category ||
      !subCategory ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }
    if (previewImage) {
      const uploadImageDetails = await uploadFileToCloudinary(
        previewImage,
        process.env.FOLDER_NAME
      );
      courseDetails.previewImage = uploadImageDetails.secure_url;
    }
    if (promoVideo) {
      const uploadVideoDetails = await uploadFileToCloudinary(
        promoVideo,
        process.env.FOLDER_NAME
      );
      courseDetails.promoVideo = uploadVideoDetails.secure_url;
    }

    courseDetails.courseName = courseName;
    courseDetails.courseSubtitle = courseSubtitle;
    courseDetails.description = description;
    courseDetails.locale = locale;
    courseDetails.instructionalLevel = instructionalLevel;
    courseDetails.category = category;
    courseDetails.subCategory = subCategory;
    courseDetails.price = price;

    courseDetails.save();
    return res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "Internal Error Occured",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getInstructorCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategoryCourses = async (req, res) => {
  try {
    const { category } = req.params;
    const courses = await Course.find({ category, status: "Published" })
      .populate({
        path: "instructor",
        select: "firstName lastName",
      })
      .populate({
        path: "ratingAndReviews",
        select: "rating review",
      })
      .select("category courseName price previewImage studentsEnrolled");
    if (courses.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No Courses Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal error occured",
      error: error,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userInfo.userId;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        select: "-password -email -enrolledCourses -courseProgress",
        populate: {
          path: "courses",
          populate: {
            path: "ratingAndReviews",
            select: "rating review",
          },
          select: "ratingAndReviews studentsEnrolled",
        },
      })
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

exports.getSearchCourses = async (req, res) => {
  try {
    const { query } = req.params;
    console.log(query);
    const courses = await Course.find({
      courseName: { $regex: query, $options: "i" },
    })
      .populate({ path: "instructor", select: "firstName lastName" })
      .populate({
        path: "ratingAndReviews",
        select: "rating review",
      });
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Error Occured",
    });
  }
};

exports.publishCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }
    if (course.status == "Published") {
      return res.status(400).json({
        success: false,
        message: "Course is already published",
      });
    }

    if (course.instructor._id != req.userInfo.userId) {
      return res.status(409).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      !course.courseName ||
      !course.courseSubtitle ||
      !course.description ||
      !course.locale ||
      !course.instructionalLevel ||
      !course.category ||
      !course.subCategory ||
      !course.previewImage ||
      !course.promoVideo ||
      !course.price ||
      course.courseContent.length == 0 ||
      course.learningObjectives.length == 0 ||
      course.prerequisites.length == 0 ||
      !course.instructor
    ) {
      return res.status(404).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const instructorDetails = await User.findById(req.userInfo.userId);

    if (
      !instructorDetails.profilePicture ||
      !instructorDetails.firstName ||
      !instructorDetails.lastName ||
      !instructorDetails.headline ||
      !instructorDetails.biography
    ) {
      return res.status(404).json({
        success: false,
        message: "Profile Details are required",
      });
    }

    course.status = "Published";
    await course.save();
    return res.status(200).json({
      success: true,
      message: "Course Published Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
    });
  }
};

//Get All student info including enrolled courses
exports.getStudentDetails = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const studentDetails = await User.findById(userId).populate(
      "enrolledCourses"
    );

    return res.status(200).json({
      studentDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
    });
  }
};
