import React, { useState } from 'react'
import Uplodeimg from '../assets/Uplodeimg.png'

const Add = () => {

    const [image1,setImage1] = useState(false)
    const [image2,setImage2] = useState(false)
    const [image3,setImage3] = useState(false)
    const [image4,setImage4] = useState(false)

  return (
    <form>
        <div>
            <p>Uplode Image</p>
            <div>
                <label htmlFor="image1">
                    <img src={Uplodeimg} alt="" />
                    <input type="file" id='image1' hidden/>
                </label>
                <label htmlFor="image2">
                    <img src={Uplodeimg} alt="" />
                    <input type="file" id='image2' hidden/>
                </label>
                <label htmlFor="image3">
                    <img src={Uplodeimg} alt="" />
                    <input type="file" id='image3' hidden/>
                </label>
                <label htmlFor="image4">
                    <img src={Uplodeimg} alt="" />
                    <input type="file" id='image4' hidden/>
                </label>
            </div>
        </div>

        <div>
            <p>Product name</p>
            <input type="text" placeholder='Type here' required />
        </div>

        <div>
            <p>Product description</p>
            <textarea type="text" placeholder='Write content here' required />
        </div>

        <div>
            <div>
                <p>Product catagory</p>
                <select>
                    <option value="">Men</option>
                    <option value="">Women</option>
                    <option value="">Kids</option>
                </select>
            </div>

            <div>
                <p>Sub catagory</p>
                <select>
                    <option value="">Topwear</option>
                    <option value="">Bottomwear</option>
                    <option value="">Winterwear</option>
                </select>
            </div>

            <div>
                <p>Product Price</p>
                <input type="Number" placeholder='25'/>
            </div>

        </div>

        <div>
            <p>Product Sizes</p>
            <div>
                <div>
                    <p>S</p>
                </div>
                <div>
                    <p>M</p>
                </div>
                <div>
                    <p>L</p>
                </div>
                <div>
                    <p>XL</p>
                </div>
                <div>
                    <p>XXL</p>
                </div>
            </div>
        </div>

        <div>
            <input type="checkbox" id='bestseller' />
            <label htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button>ADD</button>

    </form>
  )
}

export default Add
