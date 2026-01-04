import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-24 pt-14">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">

        {/* Brand Info */}
        <div>
          <img
            src={assets.logo}
            alt="DailyFit"
            className="h-20 mb-5"
          />
          <p className="text-sm text-gray-600 leading-relaxed">
            DailyFit is your go-to destination for premium fashion essentials.
            We focus on quality, comfort, and modern style designed for everyday life.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-4">
            COMPANY
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-pink-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-pink-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-pink-600 transition">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-pink-600 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-pink-600 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-4">
            GET IN TOUCH
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📞 +1 645 45 6789</li>
            <li>✉️ contact@dailyfit.com</li>
            <li>🕘 Mon – Sat: 9:00 AM – 7:00 PM</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500 py-6">
          © {new Date().getFullYear()} DailyFit. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer
