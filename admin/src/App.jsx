import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";

export const backendurl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState("null");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* Navbar */}
      <Navbar setToken={setToken} setSidebarOpen={setSidebarOpen} />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 min-h-full">
            <Routes>
              <Route path="/" element={<Add token={token} />} />
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Order token={token} />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
