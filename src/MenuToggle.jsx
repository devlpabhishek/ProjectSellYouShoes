
import React, { useState, useEffect } from "react";
import back from "./Assets/back.png";
import { Link } from "react-router-dom";


import {
  Menu,
  X,
  UserRound,
  ShoppingBag,
  Heart,
  FileText,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
const user = JSON.parse(localStorage.getItem('user'));
const menuItems = [
  {
    name: "Profile",
    icon: UserRound,
    path: "/profile",
  },
  {
    name: "Your Products",
    icon: ShoppingBag,
    path: "/YourPosts",
  },
  {
    name: "Saved",
    icon: Heart,
    path: "/wishlist",
  },
  {
    name: "Terms & Conditions",
    icon: FileText,
    path: "/terms",
  },
  {
    name: "Privacy",
    icon: ShieldCheck,
    path: "/privacy",
  },
];

export default function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="relative z-[60] flex h-11 w-11 items-center
                   justify-center rounded-xl text-gray-800
                   transition hover:bg-gray-100
                   focus:outline-none focus:ring-2
                   focus:ring-blue-500"
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Background Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
          }`}
      />

      {/* Slide-in Menu */}
      <aside
        aria-label="User menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-dvh
                    w-80 max-w-[85vw] flex-col bg-white
                    shadow-2xl transition-transform
                    duration-300 ease-in-out
                    ${isOpen
            ? "translate-x-0"
            : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between
                        border-b border-gray-200 px-5 py-5">
          
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              My Account
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {user?.firstName}
            </p>
            
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-gray-500
                       hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu Options */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-xs font-semibold
                        uppercase tracking-widest text-gray-400">
            Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3
                             rounded-xl px-3 py-3.5
                             text-sm font-medium text-gray-700
                             transition hover:bg-blue-50
                             hover:text-blue-600"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="text-gray-500
                               group-hover:text-blue-600"
                  />

                  <span className="flex-1">{item.name}</span>

                  <ChevronRight
                    size={17}
                    className="text-gray-400
                               transition group-hover:translate-x-1
                               group-hover:text-blue-600"
                  />
                </a>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Shopmate
          </p>
        </div>
      </aside>
    </>
  );
}


const Profile = () =>{
  
}