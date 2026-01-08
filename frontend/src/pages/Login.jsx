import React, { useState, useEffect } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen w-full overflow-hidden flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md -mt-25"
      >
        {/* Title */}
        <div className="mb-6 text-center">
          <p className="text-2xl font-semibold">{currentState}</p>
          <hr className="mt-2 border-gray-300" />
        </div>

        {currentState === 'Sign Up' && (
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-4 py-3 rounded mb-4 outline-none focus:border-pink-600"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-3 rounded mb-4 outline-none focus:border-pink-600"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-3 rounded mb-6 outline-none focus:border-pink-600"
          required
        />

        <div className="flex justify-between text-sm text-gray-500 mb-6">
          {currentState === 'Login' ? (
            <p className="cursor-pointer hover:text-pink-600">
              Forgot your password?
            </p>
          ) : (
            <span />
          )}

          <p
            onClick={() =>
              setCurrentState(
                currentState === 'Login' ? 'Sign Up' : 'Login'
              )
            }
            className="cursor-pointer hover:text-pink-600"
          >
            {currentState === 'Login'
              ? 'Create account'
              : 'Already have an account?'}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
        >
          {currentState === 'Login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
