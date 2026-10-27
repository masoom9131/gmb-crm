import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", msg: "Email and password are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists", msg: "User already exists" });
    }

    const displayName = name || email.split("@")[0] || "User";
    const user = await User.create({ name: displayName, email, password });
    
    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      message: "Registration successful",
      msg: "Registration successful"
    });
  } catch (error) {
    res.status(500).json({ message: error.message, msg: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        message: "Login successful",
        msg: "Login successful"
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
        msg: "Invalid email or password"
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, msg: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out", msg: "Logged out" });
};
