const express = require("express");
const router = express.Router();
const {
  handleLogin,
  handleRegister,
  handleRefresh,
  handleLogout,
  handleAddInstructor,
} = require("../controllers/Auth.js");
const { verifyJWT } = require("../middleware/verifyJWT.js");

router.post("/login", handleLogin);

router.post("/signup", handleRegister);

router.get("/refresh", handleRefresh);

router.post("/logout", handleLogout);

//Add Instructor Role to User
router.get("/addInstructor", verifyJWT, handleAddInstructor);

module.exports = router;
