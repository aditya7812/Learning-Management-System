const express = require("express");
const { verifyJWT, isInstructor } = require("../middleware/verifyJWT");
const { getInstructorDetails } = require("../controllers/User");
const router = express.Router();

router.get("/", verifyJWT, isInstructor, getInstructorDetails);

module.exports = router;
