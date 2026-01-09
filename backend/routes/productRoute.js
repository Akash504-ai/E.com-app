import express from "express"
import { addProduct, listProduct, removeProduct, singleProduct} from '../controllers/productController.js'

const productRoute = express.Router()

productRoute.post('/add',addProduct)
productRoute.post('/remove',listProduct)
productRoute.post('/single',removeProduct)
productRoute.get('/list',singleProduct)

export default productRoute;