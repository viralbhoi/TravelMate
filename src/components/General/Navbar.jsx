import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ title, navItems }) {
  const location = useLocation();

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-md border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

      <ul className="flex items-center space-x-6">
        {navItems?.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={index}>
              <Link
                to={item?.path}
                className={`flex items-center space-x-1 text-sm hover:text-blue-600 transition ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-600"
                }`}
              >
                {item.icon ? <item.icon size={20} /> : null}
                <span>{item?.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
