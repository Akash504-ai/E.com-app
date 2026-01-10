import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiPlusSquare,
  FiList,
  FiShoppingCart,
  FiMenu,
  FiX
} from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition
     ${
       isActive
         ? "bg-black text-white"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <>
      {/* Mobile Toggle Button (Navbar Area) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
      >
        <FiMenu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0
          h-full w-64
          bg-white border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b">
          <h1 className="font-semibold text-lg">Admin Panel</h1>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <NavLink to="/add" onClick={() => setOpen(false)} className={linkClass}>
            <FiPlusSquare size={18} />
            Add Items
          </NavLink>

          <NavLink to="/list" onClick={() => setOpen(false)} className={linkClass}>
            <FiList size={18} />
            List Items
          </NavLink>

          <NavLink
            to="/orders"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            <FiShoppingCart size={18} />
            Orders
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
