import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-16">

      {/* -------- CONTACT TITLE -------- */}
      <div className="mb-14">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* -------- CONTACT CONTENT -------- */}
      <div className="flex flex-col md:flex-row gap-12 items-center">

        {/* Image */}
        <img
          src={assets.contact_img}
          alt="Contact DailyFit"
          className="w-full md:w-1/2 rounded-xl shadow-md"
        />

        {/* Info */}
        <div className="md:w-1/2 text-gray-600 space-y-5 leading-relaxed">

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Our Store
            </h3>
            <p>
              DailyFit Store<br />
              21 Wellness Street,<br />
              New Delhi, India – 110001
            </p>
          </div>

          <div>
            <p>
              <span className="font-medium text-gray-800">Phone:</span>{' '}
              +91 98765 43210
            </p>
            <p>
              <span className="font-medium text-gray-800">Email:</span>{' '}
              support@dailyfit.com
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Careers at DailyFit
            </h3>
            <p>
              We’re always looking for passionate people to join our growing
              team. If you love fitness, fashion, and building meaningful
              products, we’d love to hear from you.
            </p>
            <p className="mt-1">
              Learn more about our team, culture, and current job openings.
            </p>
          </div>

          <button className="mt-4 inline-block bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 transition">
            Explore Jobs
          </button>

        </div>
      </div>

      {/* -------- EXTRA CONTACT OPTIONS -------- */}
      <div className="mt-20 grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">

        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h4 className="font-semibold text-gray-800 mb-2">
            Customer Support
          </h4>
          <p className="text-sm text-gray-600">
            Need help with an order or product? Our support team is available
            24/7 to assist you.
          </p>
        </div>

        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h4 className="font-semibold text-gray-800 mb-2">
            Business Inquiries
          </h4>
          <p className="text-sm text-gray-600">
            Interested in partnerships or collaborations? Reach out to our
            business development team.
          </p>
        </div>

        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h4 className="font-semibold text-gray-800 mb-2">
            Store Visits
          </h4>
          <p className="text-sm text-gray-600">
            Visit our store to explore our collections in person and experience
            DailyFit firsthand.
          </p>
        </div>

      </div>

      {/* -------- NEWSLETTER -------- */}
      <div className="mt-24">
        <NewsLetterBox />
      </div>

    </div>
  )
}

export default Contact
