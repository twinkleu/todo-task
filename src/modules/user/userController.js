import User from "../../models/user";
import {
  checkPassword,
  generateToken,
  hashPassword,
} from "../../helpers/helpers";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "User Details are required to register",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }
    const user = await User.create({
      username: username,
      email: email,
      password: hashPassword(password),
    });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "Error while registering the user" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "User registered successfully" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while registering the user",
      err,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "User Details are required to login",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    const isMatched = await checkPassword(password, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }
    const token = generateToken(user._id);
    return res
      .status(200)
      .json({
        success: true,
        token: token,
        message: "Logged In Successfully",
        data: user,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error while logging the user", err });
  }
};
