import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import fs from "fs";

/* ------------------ ADD PRODUCT ------------------ */
const addProduct = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);

    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (!name || !description || !price || !category || !subCategory || !sizes) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    /* ---------------- FILE HANDLING ---------------- */
    const files = req.files || {};
    const images = [
      files.image1?.[0],
      files.image2?.[0],
      files.image3?.[0],
      files.image4?.[0],
    ].filter(Boolean);

    let imageUrls = [];

    /* ---------------- CLOUDINARY UPLOAD ---------------- */
    if (images.length > 0) {
      imageUrls = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            folder: "products",
            resource_type: "image",
          });

          // 🔥 DELETE LOCAL FILE AFTER UPLOAD
          try {
            fs.unlinkSync(item.path);
          } catch (err) {
            console.warn("File delete failed:", err.message);
          }

          return result.secure_url;
        })
      );
    }

    console.log("IMAGE URLS:", imageUrls);

    /* ---------------- SAVE PRODUCT ---------------- */
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
      bestseller: bestseller === "true",
      image: imageUrls,
      date: Date.now(),
    };

    const product = await productModel.create(productData);

    console.log("SAVED PRODUCT ID:", product._id);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      productId: product._id,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ------------------ LIST PRODUCTS ------------------ */
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ REMOVE PRODUCT ------------------ */
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------------ SINGLE PRODUCT ------------------ */
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
