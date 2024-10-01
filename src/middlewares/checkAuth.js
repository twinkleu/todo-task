import jwt from "jsonwebtoken";

const secret_key = process.env.SECRET_KEY;

const checkAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token NOt Found" });
    }
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

export default checkAuth;
