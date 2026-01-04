import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)

  if (!showSearch) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-28">

      {/* Search Box */}
      <div className="bg-white w-[90%] max-w-xl rounded-xl shadow-xl p-4 flex items-center gap-3">

        {/* Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
          autoFocus
          className="flex-1 text-sm px-4 py-3 outline-none rounded-full 
                     border border-gray-300 focus:ring-2 focus:ring-pink-500"
        />

        {/* Search Icon */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 h-5 opacity-70"
        />

        {/* Close */}
        <button
            onClick={() => {
                setSearch('')
                setShowSearch(false)
            }}
            className="ml-2 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-4 h-4"
          />
        </button>

      </div>
    </div>
  )
}

export default SearchBar
