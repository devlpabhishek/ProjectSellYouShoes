import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            {/* Brand Name */}
            <Link to="/" className="text-2xl font-bold text-gray-900 cursor-pointer">
                ShopMate
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 font-medium hover:text-gray-900 transition-colors px-3 py-2 cursor-pointer">
                    Log in
                </Link>
                <Link to="/signup" className="bg-green-500 hover:bg-white hover:text-green-500 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm cursor-pointer">
                    Sign up
                </Link>
            </div>
        </nav>
    );
}