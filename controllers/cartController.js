import userModel from "../modals/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    console.log("Request Body Update:", req.body); 
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};
    console.log("itemId", itemId);

    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Cart Updated" });
    } else {
      res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    console.log("Request Body delete:", req.body); 
    const { userId, itemId, size } = req.body;
    console.log("Received userId:", userId);
    console.log("Received itemId:", itemId);
    console.log("Received size:", size);

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};
    console.log("itemId", itemId);

    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Item deleted from cart" });
    } else {
      res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart, deleteCartItem };