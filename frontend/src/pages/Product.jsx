import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProduct from '../components/RelatedProduct'

const Product = () => {
  const { productID } = useParams()
  const navigate = useNavigate()
  const { products, addToCart } = useContext(ShopContext)

  const [product, setProduct] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('center center')

  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const [showLens, setShowLens] = useState(false)


  /* ---------------- FIND PRODUCT ---------------- */
  useEffect(() => {
    const foundProduct = products.find(item => item._id === productID)
    if (foundProduct) {
      setProduct(foundProduct)
      setImage(foundProduct.image[0])
    }
  }, [products, productID])

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = () => {
    addToCart(product._id, size, quantity)
    setQuantity(1)
    setSize('')
  }

  if (!product) {
    return (
      <div className="text-center py-32 text-gray-400 text-sm">
        Product not found.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-sm text-gray-500 hover:text-pink-600 transition"
      >
        ← Back to products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT : IMAGES */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
          <div
            className="relative bg-white border rounded-2xl aspect-square overflow-hidden shadow-sm"
            onMouseEnter={() => setShowLens(true)}
            onMouseLeave={() => setShowLens(false)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setLensPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              })
            }}
          >

            {/* Main Image */}
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-contain"
            />

            {/* Zoom Lens */}
            {showLens && (
              <div
                className="absolute pointer-events-none rounded-full border border-gray-300 shadow-lg"
                style={{
                  width: 140,
                  height: 140,
                  top: lensPos.y - 70,
                  left: lensPos.x - 70,
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '200%',
                  backgroundPosition: `${(lensPos.x / 400) * 100}% ${(lensPos.y / 400) * 100}%`,
                }}
              />
            )}
          </div>


          <div className="flex gap-3 mt-5 overflow-x-auto">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setImage(img)}
                className={`w-20 h-20 rounded-xl object-cover cursor-pointer border transition
                  ${image === img
                    ? 'border-pink-600 ring-2 ring-pink-200'
                    : 'border-gray-300 hover:border-gray-400'}`}
              />
            ))}
          </div>
        </div>

        

        {/* RIGHT : DETAILS */}
        <div className="lg:col-span-7">

          {/* Title + Price */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-pink-600">
              ₹{product.price}
            </p>
          </div>

          {/* Stock */}
          <span className="inline-block mt-3 text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
            In Stock
          </span>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-500 text-sm">★★★★☆</span>
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>

          

          {/* Sizes */}
          {product.sizes && (
            <div className="mt-10">
              <p className="text-sm font-medium mb-3">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`px-4 py-2 rounded-xl border text-sm transition
                      ${size === item
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-10">
            <p className="text-sm font-medium mb-3">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 border rounded-xl hover:bg-gray-100"
              >
                −
              </button>
              <span className="text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 border rounded-xl hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.sizes && !size}
              className="bg-pink-600 text-white px-10 py-3 rounded-xl font-medium
                         hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>

            <button onClick={() => navigate("/place-order")} className="border px-10 py-3 rounded-xl font-medium hover:bg-gray-50 transition">
              Buy Now
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            🚚 Free delivery in 3–5 business days
          </p>

          {/* Trust badges */}
          <div className="mt-8 text-xs text-gray-500 space-y-1">
            <p>✔ 100% Original Products</p>
            <p>✔ Easy 7-Day Returns</p>
            <p>✔ Cash on Delivery available</p>
          </div>

        </div>
      </div>

      {/* RELATED */}
      <div className="mt-20">
        <RelatedProduct
          category={product.category}
          subCategory={product.subCategory}
          productID={product._id}
        />
      </div>

    </div>
  )
}

export default Product
