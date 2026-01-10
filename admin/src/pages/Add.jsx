import React, { useState } from "react";
import axios from "axios";
import UploadImg from "../assets/Uplodeimg.png";
import { backendurl } from "../App";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  /* ---------------- IMAGE HANDLER ---------------- */
  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  /* ---------------- SIZE TOGGLE ---------------- */
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  /* ---------------- SUBMIT ---------------- */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Admin not authorized. Please login again.");
      return;
    }

    if (sizes.length === 0) {
      alert("Please select at least one size");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img);
        }
      });

      const { data } = await axios.post(
        `${backendurl}/api/product/add`,
        formData,
        {
          headers: {
            token: token, // 🔥 THIS IS CRITICAL
          },
        }
      );

      if (data.success) {
        alert("Product added successfully");

        // Reset form
        setImages([null, null, null, null]);
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* ---------------- IMAGES ---------------- */}
      <div>
        <p className="font-medium mb-2">Upload Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index}`}
              className="cursor-pointer border rounded-lg overflow-hidden aspect-square flex items-center justify-center bg-gray-50"
            >
              <img
                src={img ? URL.createObjectURL(img) : UploadImg}
                alt="upload"
                className="object-cover w-full h-full"
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(index, e.target.files[0])
                }
              />
            </label>
          ))}
        </div>
      </div>

      {/* ---------------- NAME ---------------- */}
      <div>
        <p className="font-medium mb-1">Product Name</p>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
          className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* ---------------- DESCRIPTION ---------------- */}
      <div>
        <p className="font-medium mb-1">Product Description</p>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write content here"
          rows={4}
          className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* ---------------- CATEGORY ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="font-medium mb-1">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <p className="font-medium mb-1">Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        <div>
          <p className="font-medium mb-1">Price</p>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* ---------------- SIZES ---------------- */}
      <div>
        <p className="font-medium mb-2">Product Sizes</p>
        <div className="flex flex-wrap gap-3">
          {sizeOptions.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-4 py-1 border rounded-md text-sm font-medium
                ${
                  sizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- BESTSELLER ---------------- */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label className="text-sm">Add to bestseller</label>
      </div>

      {/* ---------------- BUTTON ---------------- */}
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-50"
      >
        {loading ? "Adding..." : "ADD PRODUCT"}
      </button>
    </form>
  );
};

export default Add;
