import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">

      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-6 sm:py-0">
        <div className="text-[#414141]">

          {/* Bestseller */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 md:w-11 h-[2px] bg-[#414141]"></span>
            <p className="font-medium text-sm md:text-base">
              OUR BESTSELLERS
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-2xl lg:text-4xl leading-snug mb-3">
            Latest Arrivals
          </h1>

          {/* Shop Now */}
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="font-semibold text-sm md:text-base">
              SHOP NOW
            </p>
            <span className="w-8 md:w-11 h-[1px] bg-[#414141]"></span>
          </div>

        </div>
      </div>

      {/* Hero Right Side */}
      <img
        className="w-full sm:w-1/2 object-cover max-h-[585px]"
        src={assets.hero_img}
        alt="Hero"
      />

    </div>
  )
}

export default Hero
