import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../App";
import { FaBox, FaTruck } from "react-icons/fa";

const currency = "₹";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  /* ================= FETCH ALL ORDERS ================= */
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendurl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
    }
  };

  /* ================= UPDATE ORDER STATUS ================= */
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.post(
        backendurl + "/api/order/status",
        { orderId, status },
        { headers: { token } }
      );
      fetchAllOrders();
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        📦 Orders Management
      </h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition grid md:grid-cols-2 gap-6"
          >
            {/* LEFT */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <FaBox className="text-indigo-500" />
                <p>Order Items</p>
              </div>

              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      Item #{i + 1}
                      {item.size && (
                        <span className="text-gray-400">
                          {" "}({item.size})
                        </span>
                      )}
                    </span>
                    <span className="font-medium">
                      Qty: {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <p className="font-semibold text-gray-800">
                  {order.address.firstName} {order.address.lastName}
                </p>

                <p className="text-sm text-gray-600">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country} –{" "}
                  {order.address.zipcode}
                </p>

                <p className="text-sm mt-1">
                  📞 {order.address.phone}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-between gap-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Total Items:</span>{" "}
                  {order.items.length}
                </p>
                <p>
                  <span className="font-medium">Payment Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  <span
                    className={`font-semibold ${
                      order.payment
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Order Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>

                <p className="text-lg font-bold text-gray-800 pt-2">
                  Amount: {currency}
                  {order.amount}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaTruck className="text-blue-500" />
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order._id, e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">
                    Out for delivery
                  </option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
