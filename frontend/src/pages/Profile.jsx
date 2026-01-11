import React, { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useNavigate } from "react-router-dom"
import Title from "../components/Title"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"

const Profile = () => {
  const { token, logout } = useContext(ShopContext)
  const navigate = useNavigate()

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  if (!token) return null

  let user = {}

  try {
    user = jwtDecode(token)
  } catch (error) {
    toast.error("Session expired. Please login again.")
    logout()
    navigate("/login")
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-12">

      <Title text1="MY" text2="PROFILE" />

      <div className="mt-10 bg-white border rounded-xl p-6 space-y-6">

        {/* ---------------- USER INFO ---------------- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">
                {user.name || "Not Provided"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {user.email || "Not Provided"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Account Status</p>
              <p className="font-medium text-green-600">
                Active
              </p>
            </div>

            {user.iat && (
              <div>
                <p className="text-gray-500">Member Since</p>
                <p className="font-medium text-gray-800">
                  {new Date(user.iat * 1000).toDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        <hr />

        {/* ---------------- ACTIONS ---------------- */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={() => navigate("/orders")}
            className="flex-1 border border-pink-600 text-pink-600 py-2 rounded hover:bg-pink-50 transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => {
              logout()
              toast.success("Logged out successfully")
              navigate("/login")
            }}
            className="flex-1 bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
