import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className="my-20">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">

        {/* Exchange Policy */}
        <div className="group flex flex-col items-center p-8 rounded-2xl 
                        bg-gray-50 hover:bg-white
                        shadow-sm hover:shadow-xl
                        transition-all duration-300">
          <img
            src={assets.exchange_icon}
            alt="Easy Exchange"
            className="w-12 h-12 mb-4 
                       group-hover:scale-110 transition-transform duration-300"
          />
          <p className="text-base font-semibold text-gray-800">
            Easy Exchange Policy
          </p>
          <p className="text-sm text-gray-600 mt-2">
            We offer hassle-free exchanges to ensure you get the perfect fit
            and style you love.
          </p>
        </div>

        {/* Return Policy */}
        <div className="group flex flex-col items-center p-8 rounded-2xl 
                        bg-gray-50 hover:bg-white
                        shadow-sm hover:shadow-xl
                        transition-all duration-300">
          <img
            src={assets.quality_icon}
            alt="7 Days Return"
            className="w-12 h-12 mb-4 
                       group-hover:scale-110 transition-transform duration-300"
          />
          <p className="text-base font-semibold text-gray-800">
            7 Days Return Policy
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Enjoy easy returns within 7 days of delivery if the product
            doesn’t meet your expectations.
          </p>
        </div>

        {/* Support */}
        <div className="group flex flex-col items-center p-8 rounded-2xl 
                        bg-gray-50 hover:bg-white
                        shadow-sm hover:shadow-xl
                        transition-all duration-300">
          <img
            src={assets.support_img}
            alt="Customer Support"
            className="w-12 h-12 mb-4 
                       group-hover:scale-110 transition-transform duration-300"
          />
          <p className="text-base font-semibold text-gray-800">
            Best Customer Support
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Our dedicated support team is available 24/7 to assist you with
            any questions or concerns.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
