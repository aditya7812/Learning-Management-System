const express = require("express");
const {
  createRatingAndReview,
  editRatingAndReview,
} = require("../controllers/RatingAndReview");
const { verifyJWT } = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/create", verifyJWT, createRatingAndReview);
router.post("/edit", verifyJWT, editRatingAndReview);

module.exports = router;
