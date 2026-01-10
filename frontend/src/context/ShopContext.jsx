import { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : {};
  });

  const cartFetchedOnce = useRef(false);

  // Restore token
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // Sync token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      if (!cartFetchedOnce.current) {
        fetchUserCart();
        cartFetchedOnce.current = true;
      }
    } else {
      delete axios.defaults.headers.common.Authorization;
      cartFetchedOnce.current = false;
    }
  }, [token]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data?.success) setProducts(res.data.products);
    } catch {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch cart from backend ONCE
  const fetchUserCart = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/cart/get`);

      if (res.data?.success) {
        const backendCart = res.data.cartData || {};

        // 🔥 DO NOT WIPE LOCAL CART ON REFRESH
        if (Object.keys(backendCart).length > 0) {
          setCartItems(backendCart);
        }
      }
    } catch {
      toast.error("Failed to load cart");
    }
  };

  // ✅ ALWAYS persist cart locally (IMPORTANT FIX)
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = async (itemId, size, quantity = 1) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    const qty = Number(quantity) || 1;

    const updatedCart = structuredClone(cartItems);
    updatedCart[itemId] = updatedCart[itemId] || {};
    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + qty;

    setCartItems(updatedCart);

    try {
      await axios.post(`${backendUrl}/api/cart/add`, {
        itemID: itemId,
        size,
        quantity: qty,
      });
    } catch {
      toast.error("Failed to add to cart");
      fetchUserCart();
    }
  };


  // Remove from cart
  const removeFromCart = async (itemId, size, removeAll = false) => {
    const updatedCart = structuredClone(cartItems);

    if (!updatedCart[itemId]?.[size]) return;

    if (removeAll) {
      delete updatedCart[itemId][size];
    } else {
      updatedCart[itemId][size] -= 1;
    }

    if (!updatedCart[itemId][size] || updatedCart[itemId][size] <= 0) {
      delete updatedCart[itemId][size];
    }

    if (Object.keys(updatedCart[itemId] || {}).length === 0) {
      delete updatedCart[itemId];
    }

    setCartItems(updatedCart);

    if (token) {
      await axios.post(`${backendUrl}/api/cart/update`, {
        itemID: itemId,
        size,
        quantity: removeAll ? 0 : updatedCart[itemId]?.[size] || 0,
      });
    }
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce(
      (sum, sizes) =>
        sum + Object.values(sizes).reduce((a, b) => a + b, 0),
      0
    );

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [id, sizes]) => {
      const product = products.find((p) => p._id === id);
      if (!product) return total;
      return (
        total +
        Object.values(sizes).reduce(
          (s, q) => s + q * product.price,
          0
        )
      );
    }, 0);

  const logout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    cartFetchedOnce.current = false;
  };

  return (
    <ShopContext.Provider
      value={{
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
        getCartAmount,
        backendUrl,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
