import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../App";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendurl}/api/product/list`);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- REMOVE PRODUCT ---------------- */
  const removeProduct = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this product?"
    );
    if (!confirm) return;

    try {
      const { data } = await axios.post(
        `${backendurl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (data.success) {
        fetchProducts();
      } else {
        alert(data.message || "Failed to remove product");
      }
    } catch (error) {
      alert("Error removing product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      {/* ---------- HEADER ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-gray-500">
            Manage all products from here
          </p>
        </div>

        <div className="bg-black text-white px-4 py-2 rounded-lg text-sm">
          Total: {products.length}
        </div>
      </div>

      {/* ---------- LOADING ---------- */}
      {loading && (
        <div className="text-gray-500 text-sm">Loading products...</div>
      )}

      {/* ---------- EMPTY ---------- */}
      {!loading && products.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
          No products found.
        </div>
      )}

      {/* ---------- DESKTOP TABLE ---------- */}
      {!loading && products.length > 0 && (
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-gray-600">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr
                  key={item._id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  </td>

                  <td className="p-4 font-medium">{item.name}</td>

                  <td className="p-4 text-gray-600">{item.category}</td>

                  <td className="p-4 font-semibold">₹{item.price}</td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => removeProduct(item._id)}
                      className="px-3 py-1 text-xs rounded-md
                                 bg-red-50 text-red-600
                                 hover:bg-red-100 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- MOBILE CARDS ---------- */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm p-4 flex gap-4"
            >
              <img
                src={item.image?.[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />

              <div className="flex-1 space-y-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="font-bold">₹{item.price}</p>

                <button
                  onClick={() => removeProduct(item._id)}
                  className="mt-2 inline-block text-xs
                             text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
