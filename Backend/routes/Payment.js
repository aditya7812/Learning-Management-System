const express = require("express");
const { createSession, enrollStudent } = require("../controllers/Payment");
const { verifyJWT } = require("../middleware/verifyJWT");
const router = express.Router();

router.post("/createSession", verifyJWT, createSession);
router.get("/completePayment/:sessionId", verifyJWT, enrollStudent);

module.exports = router;
