
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuToggle from "./MenuToggle";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export default function Navbar() {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    const updateUser = () => {
      setUser(getStoredUser());
    };

    window.addEventListener("authChange", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("authChange", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  // Logged-in user
  if (user) {
    return <MenuToggle />;
  }

  // Logged-out user
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-gray-900"
      >
        ShopMate
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-gray-600 font-medium hover:text-gray-900 px-3 py-2"
        >
          Log in
        </Link>

        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-5 rounded-lg shadow-sm"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}
