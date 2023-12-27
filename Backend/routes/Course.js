const express = require("express");
const router = express.Router();

const {
  createCourse,
  handleEditGoals,
  handleEditBasics,
  getInstructorCourseDetails,
  getCategoryCourses,
  getFullCourseDetails,
  getSearchCourses,
  publishCourse,
  getStudentDetails,
} = require("../controllers/Course");

const {
  getAllSections,
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  addSubSectionContent,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

const { verifyJWT, isInstructor } = require("../middleware/verifyJWT");

//----------------------------Instructor Course --------------------------------------
router.post("/createCourse", verifyJWT, isInstructor, createCourse);
router.post("/publishCourse", verifyJWT, isInstructor, publishCourse);
router.get("/getCourseDetails/:courseId", getInstructorCourseDetails);

//------------------------------- Section ----------------------------------------------
router.get("/getsections", getAllSections);
router.post("/createSection", verifyJWT, isInstructor, createSection);
router.post("/updateSection", verifyJWT, isInstructor, updateSection);
router.post("/deleteSection", verifyJWT, isInstructor, deleteSection);

router.post("/editCourseGoals", verifyJWT, isInstructor, handleEditGoals);
router.post("/editCourseBasics", verifyJWT, isInstructor, handleEditBasics);

// ----------------------------- SubSection -------------------------------------
router.post("/createSubSection", verifyJWT, isInstructor, createSubSection);
router.post("/updateSubSection", verifyJWT, isInstructor, updateSubSection);
router.post("/deleteSubSection", verifyJWT, isInstructor, deleteSubSection);
router.post(
  "/addSubSectionContent",
  verifyJWT,
  isInstructor,
  addSubSectionContent
);

//----------------------------- Course ----------------------------------------
router.get("/getCategoryCourses/:category", getCategoryCourses);
router.get("/getFullCourseDetails/:courseId", verifyJWT, getFullCourseDetails);
router.get("/student", verifyJWT, getStudentDetails);
router.get("/search/:query", getSearchCourses);

module.exports = router;
