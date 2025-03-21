import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
  deleteCartItem
} from "../controllers/cartController.js";
import auth from "../middlewares/auth.js"

const cartRouter = express.Router();

cartRouter.get("/get", auth, getUserCart);
cartRouter.post("/add", auth ,addToCart);
cartRouter.post("/update", auth, updateCart);
cartRouter.post("/delete", auth, deleteCartItem);

export default cartRouter;