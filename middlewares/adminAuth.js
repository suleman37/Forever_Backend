import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ message: "Unauthorized Token Login Again oo", success: false });
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.json({ message: "Unauthorized Token  Login Again", success: false });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export default adminAuth;