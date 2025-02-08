import express from "express";
import {
  listProduct,
  AddProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";

const productRoute = express.Router();

productRoute.post("/add", AddProduct);
productRoute.get("/list", listProduct);
productRoute.post("/remove", removeProduct);
productRoute.post("/single", singleProduct);

export default productRoute;