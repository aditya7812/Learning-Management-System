const express = require("express");
const router = express.Router();
const { editProfile } = require("../controllers/Profile");
const { verifyJWT } = require("../middleware/verifyJWT");

router.post("/edit", verifyJWT, editProfile);

module.exports = router;
