import express from "express"
import { addToCart, updateCart, getUserCart } from '../controllers/cartControllers.js'
import authUser from "../middleware/auth.js"

const cartRoute = express.Router()

cartRoute.post('/get', authUser, getUserCart)
cartRoute.post('/add', authUser, addToCart)
cartRoute.post('/update', authUser, updateCart)

export default cartRoute;