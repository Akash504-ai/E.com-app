import userModel from "../models/userModel.js";

// ------------------ ADD TO CART ------------------
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemID, size, quantity = 1 } = req.body;

    if (!itemID || !size) {
      return res.json({ success: false, message: "Item and size required" });
    }

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (!cartData[itemID]) cartData[itemID] = {};
    cartData[itemID][size] =
      (cartData[itemID][size] || 0) + Number(quantity);

    user.cartData = cartData;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

// ------------------ UPDATE CART ------------------
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemID, size, quantity } = req.body;

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (!cartData[itemID]) cartData[itemID] = {};

    if (quantity <= 0) {
      delete cartData[itemID][size];

      // 🔴 CRITICAL FIX
      if (Object.keys(cartData[itemID]).length === 0) {
        delete cartData[itemID];
      }
    } else {
      cartData[itemID][size] = quantity;
    }

    user.cartData = cartData;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

// ------------------ GET USER CART ------------------
const getUserCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch {
    res.json({ success: false });
  }
};

export { addToCart, updateCart, getUserCart };
