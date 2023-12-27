const express = require("express");
const {
  getUserCourseProgress,
  updateCourseProgress,
} = require("../controllers/CourseProgress");
const { verifyJWT } = require("../middleware/verifyJWT");
const router = express.Router();

router.get(
  "/getUserCourseProgress/:courseId",
  verifyJWT,
  getUserCourseProgress
);
router.post("/updateCourseProgress", verifyJWT, updateCourseProgress);

module.exports = router;
