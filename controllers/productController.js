import { v2 as cloudinary } from 'cloudinary';
import productModel  from '../modals/productModel.js';

const AddProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 ? req.files.image1[0] : null;
    const image2 = req.files.image2 ? req.files.image2[0] : null;
    const image3 = req.files.image3 ? req.files.image3[0] : null;
    const image4 = req.files.image4 ? req.files.image4[0] : null;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );
    console.log(imagesUrl);

    const ProductData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes : JSON.parse(sizes),
      bestSeller : bestSeller === "true" ? true :false,
      images: imagesUrl,
      date: Date.now()
    };
    console.log("ProductData : ", ProductData)
    const product = new productModel(ProductData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const removeProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    await productModel.findByIdAndDelete(_id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  } 
};
const singleProduct = async (req, res) => {};

export { AddProduct, listProduct, removeProduct, singleProduct };