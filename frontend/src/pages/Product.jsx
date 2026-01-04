import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProduct from '../components/RelatedProduct'

const Product = () => {
  const { productID } = useParams()
  const navigate = useNavigate()
  const { products } = useContext(ShopContext)

  const [product, setProduct] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  /* ---------------- FIND PRODUCT ---------------- */
  useEffect(() => {
    const foundProduct = products.find(item => item._id === productID)
    if (foundProduct) {
      setProduct(foundProduct)
      setImage(foundProduct.image[0])
    }
  }, [products, productID])

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-12">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-600 hover:text-pink-600 transition"
      >
        ← Back to products
      </button>

      <div className="flex flex-col md:flex-row gap-12">

        {/* ---------------- LEFT : IMAGES + DESCRIPTION ---------------- */}
        <div className="md:w-5/12 md:sticky md:top-28 self-start">

          {/* Main Image */}
          <div className="border rounded-xl overflow-hidden mb-4 max-h-[480px]">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mb-8">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer
                  ${image === img ? 'border-pink-600' : 'border-gray-300'}`}
              />
            ))}
          </div>

          {/* Description & Reviews */}
          <div>

            {/* Tabs */}
            <div className="flex gap-6 border-b pb-2">
              <button className="font-semibold border-b-2 border-pink-600 pb-2">
                Description
              </button>
              <button className="text-gray-500">
                Reviews (128)
              </button>
            </div>

            {/* Content */}
            <div className="mt-4 text-gray-600 text-sm leading-relaxed">
              <p>
                An e-commerce website is an online platform that allows businesses
                to sell products and services over the internet.
              </p>
              <p className="mt-2">
                E-commerce websites typically include product listings, shopping
                carts, secure payment gateways, and order management systems.
              </p>
            </div>

          </div>
        </div>

        {/* ---------------- RIGHT : DETAILS ---------------- */}
        <div className="md:w-7/12">

          <h1 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>

          <p className="text-xl text-pink-600 font-medium mt-3">
            ₹{product.price}
          </p>

          <p className="mt-2 text-sm text-green-600 font-medium">
            In Stock
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mt-6">
              <p className="font-medium mb-2">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border px-4 py-2 rounded
                      ${size === item
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-gray-300 text-gray-700'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <p className="font-medium mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="border px-3 py-1 rounded"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="border px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="mt-8 bg-pink-600 text-white px-10 py-3 rounded
                       hover:bg-pink-700 transition disabled:opacity-50"
            disabled={product.sizes && !size}
          >
            ADD TO CART
          </button>

          {/* Delivery Info */}
          <p className="mt-4 text-sm text-gray-500">
            🚚 Free delivery in 3–5 business days
          </p>

          {/* Extra Info */}
          <div className="mt-8 text-sm text-gray-500 space-y-2">
            <p>✔ 100% Original Products</p>
            <p>✔ Cash on Delivery available</p>
            <p>✔ Easy 7-day returns</p>
          </div>

        </div>
      </div>

      {/* ---------------- RELATED PRODUCTS ---------------- */}
      <RelatedProduct
        category={product.category}
        subCategory={product.subCategory}
        productID={product._id}
      />

    </div>
  )
}

export default Product
