import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const linkStyle = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? 'text-pink-600 border-b-2 border-pink-600'
        : 'text-gray-700 hover:text-pink-600'
    }`

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <img
          src={assets.logo}
          alt="DailyFit"
          className="h-9 scale-150 origin-left cursor-pointer"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkStyle}>HOME</NavLink>
          <NavLink to="/collection" className={linkStyle}>COLLECTION</NavLink>
          <NavLink to="/about" className={linkStyle}>ABOUT</NavLink>
          <NavLink to="/contact" className={linkStyle}>CONTACT</NavLink>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Search */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 h-5 cursor-pointer"
          />

          {/* Profile Dropdown */}
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 h-5 cursor-pointer"
            />

            <div
              className="absolute right-0 mt-3 w-40 bg-white border rounded-md shadow-lg
                         opacity-0 invisible group-hover:opacity-100 group-hover:visible
                         transition-all duration-200"
            >
              <p className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                My Profile
              </p>
              <p className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                Orders
              </p>
              <p className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                Logout
              </p>
            </div>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 h-5"
            />
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs 
                             w-5 h-5 rounded-full flex items-center justify-center">
              10
            </span>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 px-6 py-4">
            <NavLink onClick={() => setOpen(false)} to="/" className={linkStyle}>HOME</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/collection" className={linkStyle}>COLLECTION</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className={linkStyle}>ABOUT</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className={linkStyle}>CONTACT</NavLink>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
