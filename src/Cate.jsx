import React, { useState } from 'react';

export default function CategoryBar() {
    // State to track which category is currently selected
    const [activeCategory, setActiveCategory] = useState('All');

    // Array of categories to make it easy to add or remove them later
    const categories = [
        "All", "Clothing & Shoes", "Electronics", "Home & Garden", 
        "Vintage", "Sports", "Toys & Games", "Books"
    ];

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* CATEGORIES SECTION */}
                {/* overflow-x-auto allows scrolling on small screens without breaking the layout */}
                <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                                activeCategory === category
                                    ? "bg-gray-900 text-white" // Active state
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Inactive state
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* SORT BY SECTION */}
                <div className="flex items-center gap-2 shrink-0">
                    <label htmlFor="sort" className="text-sm font-medium text-gray-600 hidden sm:block">
                        Sort By:
                    </label>
                    <select 
                        id="sort"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full md:w-auto p-2 cursor-pointer outline-none transition-colors"
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="popular">Most Popular</option>
                        <option value="nearest">Nearest to Me</option>
                    </select>
                </div>

            </div>
        </div>
    );
}