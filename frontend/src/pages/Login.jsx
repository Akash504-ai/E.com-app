import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  // Lock scroll when login modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const url =
        currentState === "Login"
          ? `${backendUrl}/api/user/login`
          : `${backendUrl}/api/user/register`;

      const payload =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };

      const res = await axios.post(url, payload);

      if (res.data?.success) {
        setToken(res.data.token);
        toast.success(
          currentState === "Login"
            ? "Login successful"
            : "Account created successfully"
        );
        navigate("/");
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Server error, try again"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        {/* Title */}
        <div className="mb-6 text-center">
          <p className="text-2xl font-semibold">{currentState}</p>
          <hr className="mt-2 border-gray-300" />
        </div>

        {/* Name (Sign Up only) */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-3 rounded mb-4 outline-none focus:border-pink-600"
            required
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-3 rounded mb-4 outline-none focus:border-pink-600"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-3 rounded mb-6 outline-none focus:border-pink-600"
          required
        />

        {/* Footer links */}
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          {currentState === "Login" ? (
            <p className="cursor-pointer hover:text-pink-600">
              Forgot your password?
            </p>
          ) : (
            <span />
          )}

          <p
            onClick={() =>
              setCurrentState(
                currentState === "Login" ? "Sign Up" : "Login"
              )
            }
            className="cursor-pointer hover:text-pink-600"
          >
            {currentState === "Login"
              ? "Create account"
              : "Already have an account?"}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
        >
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
