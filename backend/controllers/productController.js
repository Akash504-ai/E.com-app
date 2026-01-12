import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

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

    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    /* ---------------- SIZE SAFE PARSE ---------------- */
    let parsedSizes = [];
    if (sizes && sizes !== "") {
      parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    }

    if (parsedSizes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one size is required",
      });
    }

    /* ---------------- IMAGE CHECK ---------------- */
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const files = req.files;
    const images = [
      files.image1?.[0],
      files.image2?.[0],
      files.image3?.[0],
      files.image4?.[0],
    ].filter(Boolean);

    let imageUrls = [];

    /* ---------------- CLOUDINARY UPLOAD ---------------- */
    imageUrls = await Promise.all(
    images.map(async (item) => {
      const result = await cloudinary.uploader.upload(
        `data:${item.mimetype};base64,${item.buffer.toString("base64")}`,
        { folder: "products" }
      );
      return result.secure_url;
    })
  );

    /* ---------------- SAVE PRODUCT ---------------- */
    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true" || bestseller === true,
      image: imageUrls,
      date: Date.now(),
    });

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
