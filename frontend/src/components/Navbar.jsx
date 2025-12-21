import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
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

        {/* LOGO — ONLY SCALED, NAVBAR UNCHANGED */}
        <img
          src={assets.logo}
          alt="DailyFit"
          className="h-9 w-15 scale-190 origin-left cursor-pointer"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkStyle}>HOME</NavLink>
          <NavLink to="/collection" className={linkStyle}>COLLECTION</NavLink>
          <NavLink to="/about" className={linkStyle}>ABOUT</NavLink>
          <NavLink to="/contact" className={linkStyle}>CONTACT</NavLink>
        </ul>

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
