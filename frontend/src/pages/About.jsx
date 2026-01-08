import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-16">

      {/* -------- ABOUT US -------- */}
      <div className="mb-14">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Image */}
        <img
          src={assets.about_img}
          alt="About DailyFit"
          className="w-full md:w-1/2 rounded-xl shadow-md"
        />

        {/* Content */}
        <div className="md:w-1/2 text-gray-600 space-y-4 leading-relaxed">
          <p>
            <b className="text-gray-800">DailyFit</b> was born out of a passion for
            creating a healthier, more confident lifestyle through quality
            activewear and everyday essentials. We believe that what you wear
            should support your movement, comfort, and confidence — every single day.
          </p>

          <p>
            Since our inception, we have focused on blending modern design with
            high-performance fabrics. Every product is carefully crafted,
            tested, and refined to ensure it meets our standards of durability,
            comfort, and style.
          </p>

          <p>
            Whether you’re working out, running errands, or relaxing at home,
            DailyFit is designed to move with you — effortlessly.
          </p>

          <div className="pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p>
              Our mission at DailyFit is simple: to empower people to feel
              comfortable and confident in their everyday lives by providing
              reliable, stylish, and affordable products that never compromise
              on quality.
            </p>
          </div>
        </div>
      </div>

      {/* -------- WHY CHOOSE US -------- */}
      <div className="mt-20 mb-12">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h4 className="font-semibold text-gray-800 mb-2">
            Quality Assurance
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Every product goes through strict quality checks to ensure superior
            fabric strength, comfort, and long-lasting performance.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h4 className="font-semibold text-gray-800 mb-2">
            Convenience
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            With our easy-to-use platform, fast checkout, and reliable delivery,
            shopping with DailyFit is simple, smooth, and hassle-free.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border rounded-xl p-6 hover:shadow-md transition">
          <h4 className="font-semibold text-gray-800 mb-2">
            Exceptional Customer Service
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our support team is always here to help — before, during, and after
            your purchase — because your satisfaction matters to us.
          </p>
        </div>
      </div>

      {/* -------- EXTRA TRUST SECTION -------- */}
      <div className="mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-3xl font-bold text-pink-600">10k+</p>
          <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-pink-600">500+</p>
          <p className="text-sm text-gray-600 mt-1">Products Delivered</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-pink-600">4.8★</p>
          <p className="text-sm text-gray-600 mt-1">Average Rating</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-pink-600">24/7</p>
          <p className="text-sm text-gray-600 mt-1">Customer Support</p>
        </div>
      </div>

      {/* -------- NEWSLETTER -------- */}
      <div className="mt-24">
        <NewsLetterBox />
      </div>

    </div>
  )
}

export default About
