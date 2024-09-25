import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { passwordEncryption } from "../config/common.js";
import User from "../models/userModel.js";
import { validationResult } from "express-validator";

async function registerUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: errors.array()[0].msg,
        data: null,
      });
    }
    const { name, email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        msg: "User already exist with this email",
        data: null,
      });
    }
    const hashedPassword = await passwordEncryption(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      msg: "Account Signed Up Successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "We are facing difficulties while signup, Please try again later ",
      data: null,
    });
  }
}

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: errors.array()[0].msg,
      data: null,
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("🚀 ~ loginUser ~ user:", user);
    if (!user) {
      return res.status(400).json({
        msg: "Invalid Email and Passwords",
        data: null,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid Credentials",
        data: null,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      msg: "Congratulations! Login Successfully",
      data: { user, token: token },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: "We are facing difficulties while login, Please try again later ",
      data: null,
    });
  }
}

async function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: errors.array()[0].msg,
      data: null,
    });
  }

  const { email, name } = req.body;

  try {
    let user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        msg: "User Details Not Found",
        data: null,
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({
      msg: "Congratulations! Information updated",
      data: user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: "We are facing difficulties while updating an information, Please try again later ",
      data: null,
    });
  }
}
async function getUserDetails(req, res) {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    return res.status(200).json({
      msg: "Congratulations! Information Fetched",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "We are facing difficulties while fetching details of a User , Please try again later ",
      data: null,
    });
  }
}

export default {
  registerUser,
  loginUser,
  updateUser,
  getUserDetails,
};
