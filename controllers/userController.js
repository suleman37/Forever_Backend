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

const loginUser = async (req, res) => {};

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

const loginAdmin = async (req, res) => {};

export { loginAdmin, loginUser, registerUser };
