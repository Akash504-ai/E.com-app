import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getCartAmount, currency } = useContext(ShopContext)
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-12 grid md:grid-cols-2 gap-10">

      {/* ---------------- LEFT : DELIVERY INFO ---------------- */}
      <div>
        <Title text1="DELIVERY" text2="INFORMATION" />

        <div className="mt-6 space-y-4">
          <div className="flex gap-4">
            <input className="input" type="text" placeholder="First name" />
            <input className="input" type="text" placeholder="Last name" />
          </div>

          <input className="input" type="email" placeholder="Email address" />
          <input className="input" type="text" placeholder="Street" />

          <div className="flex gap-4">
            <input className="input" type="text" placeholder="City" />
            <input className="input" type="text" placeholder="State" />
          </div>

          <div className="flex gap-4">
            <input className="input" type="number" placeholder="Zipcode" />
            <input className="input" type="text" placeholder="Country" />
          </div>

          <input className="input" type="number" placeholder="Phone" />
        </div>
      </div>

      {/* ---------------- RIGHT : SUMMARY & PAYMENT ---------------- */}
      <div>

        {/* Cart Total */}
        <div className="border rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>{currency}{getCartAmount()}</span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-4">
            <span>Total</span>
            <span>{currency}{getCartAmount()}</span>
          </div>
        </div>

        {/* Payment Method */}
        <Title text1="PAYMENT" text2="METHOD" />

        <div className="mt-6 space-y-4">

          {/* Stripe */}
          <div
            onClick={() => setPaymentMethod('stripe')}
            className={`payment-box ${paymentMethod === 'stripe' && 'active'}`}
          >
            <span></span>
            <img src={assets.stripe_logo} alt="Stripe" className="h-6" />
          </div>

          {/* Razorpay */}
          <div
            onClick={() => setPaymentMethod('razorpay')}
            className={`payment-box ${paymentMethod === 'razorpay' && 'active'}`}
          >
            <span></span>
            <img src={assets.razorpay_logo} alt="Razorpay" className="h-6" />
          </div>

          {/* COD */}
          <div
            onClick={() => setPaymentMethod('cod')}
            className={`payment-box ${paymentMethod === 'cod' && 'active'}`}
          >
            <span></span>
            <p className="font-medium">CASH ON DELIVERY</p>
          </div>
        </div>

        <button onClick={()=>navigate('/orders')} className="mt-8 w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition">
          PLACE ORDER
        </button>
      </div>
    </div>
  )
}

export default PlaceOrder
