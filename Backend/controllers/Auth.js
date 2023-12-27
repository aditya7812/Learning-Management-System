const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.render("login", {
      message: "Email and Password Required",
    });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser)
    return res.status(500).json({
      message: "User Not Available",
    });
  if (!bcrypt.compare(password, foundUser.password))
    return res.status(401).json({
      message: "Unauthorized",
    });

  try {
    const accessToken = jwt.sign(
      {
        userInfo: {
          userId: foundUser._id,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { userId: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Side Error Occured",
    });
  }
};

const handleRegister = async (req, res) => {
  const { fullName, email, password, roles } = req.body;
  if (!fullName || !email || !password || roles.length == 0) {
    return res.status(400).json({
      message: "Required Fields Missing",
    });
  }

  const duplicate = await User.findOne({ email: email }).exec();

  if (duplicate)
    return res.status(409).json({
      message: "User Already Exist",
    });
  const [firstName, lastName] = fullName.split(" ");

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      roles: roles,
    });

    return res.status(200).json({
      success: true,
      message: "Registerd",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Error Occured",
    });
  }
};

const handleRefresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findById(decoded.userId).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          userInfo: {
            userId: foundUser._id,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ success: true, accessToken });
    }
  );
};

const handleLogout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

const handleAddInstructor = async (req, res) => {
  try {
    const isUser = await User.findById(req.userInfo.userId);
    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (isUser.roles.includes("Instructor")) {
      return res.status(409).json({
        success: true,
        message: "User Already has Instructor role",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: isUser._id,
      },
      {
        $push: {
          roles: "Instructor",
        },
      },
      { new: true }
    );
    const accessToken = jwt.sign(
      {
        userInfo: {
          userId: updatedUser._id,
          roles: updatedUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ success: true, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
      error: error.message,
    });
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  handleRefresh,
  handleLogout,
  handleAddInstructor,
};
