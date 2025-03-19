import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Token not provided", success: false });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Unauthorized access", success: false });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Invalid or expired token', success: false });
  }
};

export default adminAuth;