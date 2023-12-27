const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Forbidden" });
    }
    req.userInfo = decoded.userInfo;
    next();
  });
};

exports.isStudent = (req, res, next) => {
  try {
    if (!req.userInfo.roles.includes("Student")) {
      return res.status(401).json({
        success: false,
        message: "Protected route for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal error occured",
    });
  }
};

exports.isInstructor = (req, res, next) => {
  try {
    if (!req.userInfo.roles.includes("Instructor")) {
      return res.status(401).json({
        success: false,
        message: "Protected route for instructor only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal error occured",
    });
  }
};
