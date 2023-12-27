const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const authRoutes = require("./routes/Auth");
const profileRoutes = require("./routes/Profile");
const userRoutes = require("./routes/User");
const instructorRoutes = require("./routes/Instructor");
const paymentRoutes = require("./routes/Payment");
const ratingAndReviewRoutes = require("./routes/RatingAndReview");
const courseProgressRoutes = require("./routes/CourseProgress");
const courseRoutes = require("./routes/Course");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/instructor", instructorRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/ratingAndReview", ratingAndReviewRoutes);
app.use("/api/v1/courseProgress", courseProgressRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
