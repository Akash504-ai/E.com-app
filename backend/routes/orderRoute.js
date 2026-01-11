import express from "express"
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from "../middleware/adminauth.js";
import authUser from "../middleware/auth.js";

const orderRoute = express.Router()

orderRoute.post('/list', adminAuth, allOrders)
orderRoute.post('/status', adminAuth, updateStatus)
orderRoute.post('/place', authUser, placeOrder)
orderRoute.post('/stripe', authUser, placeOrderStripe)
orderRoute.post('/razorpay', authUser, placeOrderRazorpay)
orderRoute.post('/userorders', authUser, userOrders)
orderRoute.post('/verifyStripe', verifyStripe)

export default orderRoute;