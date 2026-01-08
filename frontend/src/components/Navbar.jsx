import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const {setShowSearch, getCartCount} = useContext(ShopContext)

  const linkStyle = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? 'text-pink-600 border-b-2 border-pink-600'
        : 'text-gray-700 hover:text-pink-600'
    }`

  const mobileLinkStyle = ({ isActive }) =>
  `py-2 px-3 rounded-md transition ${
    isActive
      ? 'bg-pink-100 text-pink-600 font-semibold'
      : 'text-gray-800 hover:bg-gray-100'
  }`


  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to='/'>
          <img
            src={assets.logo}
            alt="DailyFit"
            className="h-11 scale-173 origin-left cursor-pointer"
          />
        </Link>

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
            onClick={()=>setShowSearch(true)}
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
              {getCartCount()}
            </span>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 z-50"
          onClick={() => setOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">

          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <img
              src={assets.logo}
              alt="DailyFit"
              className="h-10"
            />
            <button onClick={() => setOpen(false)}>
              <X size={28} />
            </button>
          </div>

          {/* Menu Links */}
          <ul className="flex flex-col gap-4 px-6 py-8 text-lg">
            <NavLink
              to="/"
              className={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              HOME
            </NavLink>

            <NavLink
              to="/collection"
              className={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              COLLECTION
            </NavLink>

            <NavLink
              to="/about"
              className={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              ABOUT
            </NavLink>

            <NavLink
              to="/contact"
              className={mobileLinkStyle}
              onClick={() => setOpen(false)}
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
