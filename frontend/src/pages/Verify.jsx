import React, { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { ShopContext } from "../context/ShopContext"
import { toast } from "react-toastify"

const Verify = () => {
  const { backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const session_id = searchParams.get("session_id")

  useEffect(() => {
    const verifyPayment = async () => {
      if (!session_id) {
        toast.error("Payment verification failed")
        navigate("/cart")
        return
      }

      try {
        const res = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { session_id }
        )

        if (res.data.success) {
          toast.success("Payment successful")
          navigate("/orders")
        } else {
          toast.error("Payment failed")
          navigate("/cart")
        }
      } catch (error) {
        console.error(error)
        toast.error("Verification error")
        navigate("/cart")
      }
    }

    verifyPayment()
  }, [])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-lg font-medium">Verifying payment, please wait…</p>
    </div>
  )
}

export default Verify
