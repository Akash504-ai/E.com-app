import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { Link } from 'react-router-dom'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])

  const [category, setCategory] = useState([])
  const [type, setType] = useState([])
  const [sort, setSort] = useState('relevant')

  /* ---------------- FILTER HANDLERS ---------------- */

  const toggleCategory = (value) => {
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleType = (value) => {
    setType(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  /* ---------------- APPLY FILTERS + SEARCH ---------------- */

  useEffect(() => {
    let tempProducts = [...products]

    /* SEARCH FILTER */
    if (showSearch && search.trim() !== '') {
      tempProducts = tempProducts.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    /* CATEGORY FILTER */
    if (category.length > 0) {
      tempProducts = tempProducts.filter(item =>
        category.includes(item.category)
      )
    }

    /* TYPE FILTER */
    if (type.length > 0) {
      tempProducts = tempProducts.filter(item =>
        type.includes(item.subCategory)
      )
    }

    /* SORT */
    if (sort === 'low-high') {
      tempProducts.sort((a, b) => a.price - b.price)
    }

    if (sort === 'high-low') {
      tempProducts.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(tempProducts)
  }, [products, search, showSearch, category, type, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] my-12 flex flex-col md:flex-row gap-8">

      {/* ---------------- LEFT FILTERS ---------------- */}
      <div className="md:w-1/4">

        {/* Filter Toggle (Mobile) */}
        <p
          className="flex items-center gap-2 font-semibold cursor-pointer md:hidden"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 transition-transform ${showFilter ? 'rotate-180' : ''}`}
          />
        </p>

        {/* Filter Box */}
        <div className={`${showFilter ? 'block' : 'hidden'} md:block mt-6`}>

          {/* Category */}
          <div className="border rounded-lg p-4 mb-6">
            <p className="font-medium mb-3">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {['Men', 'Women', 'Kids'].map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" onChange={() => toggleCategory(item)} />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Type */}
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-3">TYPE</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {['Topwear', 'Bottomwear', 'Winterwear'].map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" onChange={() => toggleType(item)} />
                  {item}
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- RIGHT SIDE ---------------- */}
      <div className="md:w-3/4">

        {/* Title + Sort */}
        <div className="flex justify-between items-center mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="border px-3 py-2 text-sm rounded"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(item => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="group bg-white border rounded-xl overflow-hidden
                           hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-50">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover
                               group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-3 text-center">
                  <p className="text-sm font-semibold truncate">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-1">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Collection
