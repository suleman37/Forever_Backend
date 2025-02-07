import userModel from "../modals/userModel.js";

const loginUser = async (req, res) => {};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
  } catch (error) {
    
  }
};

const loginAdmin = async (req, res) => {};

export { loginAdmin, loginUser, registerUser };