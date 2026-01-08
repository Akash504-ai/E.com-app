import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  // ------------------ CONSTANTS ------------------
  const currency = "₹";
  const delivery_fee = 10;

  // ------------------ STATES ------------------
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
  const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ------------------ ADD TO CART ------------------
  const addToCart = (itemId, size, quantity = 1) => {
    if (!size) {
      toast.error("Please select a product size");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] =
        (cartData[itemId][size] || 0) + quantity;
    } else {
      cartData[itemId] = { [size]: quantity };
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // ------------------ REMOVE FROM CART ------------------
  const removeFromCart = (itemId, size) => {
    const cartData = structuredClone(cartItems);

    if (!cartData[itemId] || !cartData[itemId][size]) return;

    cartData[itemId][size] -= 1;

    if (cartData[itemId][size] === 0) {
      delete cartData[itemId][size];
    }

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData);
  };

  // ------------------ CART COUNT ------------------
  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }
    return total;
  };

  // ------------------ CART TOTAL ------------------
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        totalAmount += product.price * cartItems[itemId][size];
      }
    }

    return totalAmount;
  };

  // ------------------ CONTEXT VALUE ------------------
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartAmount
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
