import {v2 as cloudinary} from 'cloudinary';

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
        const result = await cloudinary.uploader.upload (item.path,{resource_type:'image'});
        return result.secure_url;
      })
    );

    console.log(
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller
    );
    console.log(imagesUrl);
    res.json({});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {};
const removeProduct = async (req, res) => {};
const singleProduct = async (req, res) => {};

export { AddProduct, listProduct, removeProduct, singleProduct };
