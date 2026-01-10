import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/* ======================================================
   PLACE ORDER (CASH ON DELIVERY)
====================================================== */
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { items, amount, address } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.json({
        success: false,
        message: "Order items are required",
      });
    }

    if (!address) {
      return res.json({
        success: false,
        message: "Delivery address is required",
      });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "Placed",
      date: Date.now(),
    };

    // Save order
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    res.json({
      success: false,
      message: "Failed to place order",
    });
  }
};

/* ======================================================
   STRIPE (STUB – SAFE PLACEHOLDER)
====================================================== */
const placeOrderStripe = async (req, res) => {
  res.json({
    success: false,
    message: "Stripe payment not implemented yet",
  });
};

/* ======================================================
   RAZORPAY (STUB – SAFE PLACEHOLDER)
====================================================== */
const placeOrderRazorpay = async (req, res) => {
  res.json({
    success: false,
    message: "Razorpay payment not implemented yet",
  });
};

/* ======================================================
   GET ALL ORDERS (ADMIN)
====================================================== */
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("ALL ORDERS ERROR:", error);
    res.json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

/* ======================================================
   GET USER ORDERS (FRONTEND)
====================================================== */
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel
      .find({ userId })
      .sort({ date: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("USER ORDERS ERROR:", error);
    res.json({
      success: false,
      message: "Failed to fetch user orders",
    });
  }
};

/* ======================================================
   UPDATE ORDER STATUS (ADMIN)
====================================================== */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Order ID and status required",
      });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
