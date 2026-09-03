import React from 'react';
import Product from './Products.json'; // Importing the products data

export default function ProductGrid() {
    // Mock data for the products


    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">

                <h2 className="text-xl font-semibold mb-6">Trending Offers</h2>
                <div className="flex items-center gap-2 w-full md:w-auto">

                <input
                    type="text"
                    placeholder="Search for products..."
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full max-w-md focus:outline-none focus:border-blue-500"
                    />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Search
                </button>
                    </div>
            </div>

            {/* Grid Layout: 2 items on mobile, 3 on tablet, 4 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {Product.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer relative group flex flex-col"
                    >
                        {/* Wishlist Heart Icon */}
                        <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>

                        {/* Product Image */}
                        <div className="h-48 w-full p-4 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-4 flex flex-col flex-grow border-t border-gray-100">

                            {/* Brand */}
                            <span className="text-sm text-gray-500 font-medium mb-1">
                                {product.brand}
                            </span>

                            {/* Title (Truncated to 2 lines) */}
                            <h3 className="text-sm text-gray-900 group-hover:text-blue-600 line-clamp-2 h-10 mb-2">
                                {product.title}
                            </h3>

                            {/* Rating & Reviews */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-green-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold flex items-center gap-0.5">
                                    {product.rating}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">
                                    ({product.reviews})
                                </span>
                            </div>

                            {/* Pricing */}
                            <div className="flex items-baseline gap-2 mb-1 mt-auto">
                                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                                <span className="text-sm font-bold text-green-600">{product.discount}</span>
                            </div>

                            {/* Delivery Info */}
                            <div className="text-xs text-gray-700 mt-1">
                                Free delivery
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}