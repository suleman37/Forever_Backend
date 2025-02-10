import validator from "validator";
import userModel from "../modals/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createtoken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const Token = createtoken(user._id);
      res.json({ message: "Login Success", success: true, Token });
    } else {
      return res.json({ message: "Invalid Credentials", success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong", success: false });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ message: "User Already Exists", success: false });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        message: "Please Enter a valid Email",
        success: false,
      });
    }
    if (password.length < 8) {
      return res.json({
        message: "Please Enter a Strong Password",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });
    const user = await newUser.save();
    const token = createtoken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong", success: false });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const Token = jwt.sign({ email, password }, process.env.JWT_SECRET);
      res.json({ success: true, Token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong", success: false });
  }
};

export { loginAdmin, loginUser, registerUser };
