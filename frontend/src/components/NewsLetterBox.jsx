import React from 'react'

const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="my-20 bg-gray-50 rounded-2xl px-6 py-12 text-center">

      {/* Heading */}
      <p className="text-2xl font-semibold text-gray-800">
        Subscribe now & get <span className="text-pink-600">20% off</span>
      </p>

      {/* Description */}
      <p className="text-sm text-gray-600 max-w-xl mx-auto mt-3">
        Join our newsletter to receive exclusive offers, early access to new
        arrivals, and the latest fashion updates directly in your inbox.
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full sm:w-80 px-4 py-3 rounded-full border border-gray-300
                     text-sm outline-none focus:ring-2 focus:ring-pink-500
                     transition-all"
        />

        <button
          type="submit"
          className="px-8 py-3 rounded-full bg-pink-600 text-white
                     text-sm font-medium hover:bg-pink-700
                     transition-all"
        >
          SUBSCRIBE
        </button>
      </form>

    </div>
  )
}

export default NewsLetterBox
