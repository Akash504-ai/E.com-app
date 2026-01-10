import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {
    cartItems,
    getCartAmount,
    currency,
    backendUrl,
    token
  } = useContext(ShopContext)

  const [paymentMethod, setPaymentMethod] = useState('cod')

  // ✅ controlled address state
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const navigate = useNavigate()

  // ✅ safe input handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
  }

  // ✅ validation
  const validateForm = () => {
    for (const key in address) {
      if (!address[key].trim()) {
        toast.error(`Please enter ${key}`)
        return false
      }
    }

    if (!/^\d{10}$/.test(address.phone)) {
      toast.error('Enter a valid 10-digit phone number')
      return false
    }

    return true
  }

  // ✅ PLACE ORDER
  const placeOrderHandler = async () => {
    if (!token) {
      toast.error('Please login to place order')
      return
    }

    if (!validateForm()) return

    const items = []

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        items.push({
          productId: itemId,
          size,
          quantity: cartItems[itemId][size]
        })
      }
    }

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      const res = await axios.post(`${backendUrl}/api/order/place`, {
        items,
        amount: getCartAmount(),
        address,
        paymentMethod
      })

      if (res.data.success) {
        toast.success('Order placed successfully')
        navigate('/orders')
      } else {
        toast.error(res.data.message || 'Order failed')
      }
    } catch (error) {
      console.error(error)
      toast.error('Order placement failed')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-12 grid md:grid-cols-2 gap-10">

      {/* ---------------- LEFT : DELIVERY INFO ---------------- */}
      <div>
        <Title text1="DELIVERY" text2="INFORMATION" />

        <div className="mt-6 space-y-4">
          <div className="flex gap-4">
            <input className="input" name="firstName" value={address.firstName} onChange={handleChange} type="text" placeholder="First name" />
            <input className="input" name="lastName" value={address.lastName} onChange={handleChange} type="text" placeholder="Last name" />
          </div>

          <input className="input" name="email" value={address.email} onChange={handleChange} type="email" placeholder="Email address" />
          <input className="input" name="street" value={address.street} onChange={handleChange} type="text" placeholder="Street" />

          <div className="flex gap-4">
            <input className="input" name="city" value={address.city} onChange={handleChange} type="text" placeholder="City" />
            <input className="input" name="state" value={address.state} onChange={handleChange} type="text" placeholder="State" />
          </div>

          <div className="flex gap-4">
            <input className="input" name="zipcode" value={address.zipcode} onChange={handleChange} type="number" placeholder="Zipcode" />
            <input className="input" name="country" value={address.country} onChange={handleChange} type="text" placeholder="Country" />
          </div>

          <input className="input" name="phone" value={address.phone} onChange={handleChange} type="number" placeholder="Phone" />
        </div>
      </div>

      {/* ---------------- RIGHT : SUMMARY & PAYMENT ---------------- */}
      <div>

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

        <Title text1="PAYMENT" text2="METHOD" />

        <div className="mt-6 space-y-4">
          <div onClick={() => setPaymentMethod('stripe')} className={`payment-box ${paymentMethod === 'stripe' && 'active'}`}>
            <span></span>
            <img src={assets.stripe_logo} alt="Stripe" className="h-6" />
          </div>

          <div onClick={() => setPaymentMethod('razorpay')} className={`payment-box ${paymentMethod === 'razorpay' && 'active'}`}>
            <span></span>
            <img src={assets.razorpay_logo} alt="Razorpay" className="h-6" />
          </div>

          <div onClick={() => setPaymentMethod('cod')} className={`payment-box ${paymentMethod === 'cod' && 'active'}`}>
            <span></span>
            <p className="font-medium">CASH ON DELIVERY</p>
          </div>
        </div>

        <button
          onClick={placeOrderHandler}
          className="mt-8 w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  )
}

export default PlaceOrder
