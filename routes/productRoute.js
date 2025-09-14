import express from "express";
import {
  listProduct,
  AddProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const productRoute = express.Router();

productRoute.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  AddProduct
); 
productRoute.get("/list" , listProduct);
productRoute.post("/remove", removeProduct);
productRoute.post("/single", singleProduct);

export default productRoute;