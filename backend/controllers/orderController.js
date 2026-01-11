import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import productModel from "../models/productModel.js"
import Stripe from "stripe"

/* ---------------- GLOBALS ---------------- */
const currency = "inr"
const deliveryCharges = 0
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

/* ======================================================
   PLACE ORDER (CASH ON DELIVERY)
====================================================== */
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id
    const { items, amount, address } = req.body

    if (!items?.length) {
      return res.json({ success: false, message: "Order items required" })
    }

    if (!address) {
      return res.json({ success: false, message: "Address required" })
    }

    const order = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "Placed",
      date: Date.now(),
    })

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({
      success: true,
      message: "Order placed successfully",
      order,
    })
  } catch (error) {
    console.error("COD ORDER ERROR:", error)
    res.json({ success: false, message: "Order failed" })
  }
}

/* ======================================================
   PLACE ORDER (STRIPE)
====================================================== */
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id
    const { items, amount, address } = req.body
    const { origin } = req.headers

    if (!items?.length) {
      return res.json({ success: false, message: "Order items required" })
    }

    const order = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      status: "Pending",
      date: Date.now(),
    })

    const line_items = []

    for (const item of items) {
      const product = await productModel.findById(item.productId)
      if (!product) continue

      line_items.push({
        price_data: {
          currency,
          product_data: {
            name: `${product.name} (${item.size})`,
          },
          unit_amount: product.price * 100,
        },
        quantity: item.quantity,
      })
    }

    if (deliveryCharges > 0) {
      line_items.push({
        price_data: {
          currency,
          product_data: { name: "Delivery Charges" },
          unit_amount: deliveryCharges * 100,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      /* 🔐 CRITICAL */
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
      },

      success_url: `${origin}/verify?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/verify?canceled=true`,
    })

    res.json({
      success: true,
      session_url: session.url,
    })
  } catch (error) {
    console.error("STRIPE ORDER ERROR:", error)
    res.json({ success: false, message: "Stripe order failed" })
  }
}

/* ======================================================
   VERIFY STRIPE PAYMENT (SECURE)
====================================================== */
const verifyStripe = async (req, res) => {
  try {
    const { session_id } = req.body

    if (!session_id) {
      return res.json({ success: false, message: "Session ID missing" })
    }

    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.payment_status !== "paid") {
      return res.json({ success: false, message: "Payment not completed" })
    }

    const { orderId, userId } = session.metadata

    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      status: "Placed",
    })

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({ success: true })
  } catch (error) {
    console.error("VERIFY STRIPE ERROR:", error)
    res.json({ success: false, message: "Verification failed" })
  }
}

/* ======================================================
   RAZORPAY (PLACEHOLDER)
====================================================== */
const placeOrderRazorpay = async (req, res) => {
  res.json({
    success: false,
    message: "Razorpay not implemented yet",
  })
}

/* ======================================================
   GET ALL ORDERS (ADMIN)
====================================================== */
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 })
    res.json({ success: true, orders })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: "Failed to fetch orders" })
  }
}

/* ======================================================
   GET USER ORDERS
====================================================== */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user.id })
      .sort({ date: -1 })

    res.json({ success: true, orders })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: "Failed to fetch user orders" })
  }
}

/* ======================================================
   UPDATE ORDER STATUS (ADMIN)
====================================================== */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Status updated" })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: "Status update failed" })
  }
}

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
}
