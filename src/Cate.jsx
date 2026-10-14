
import React, { useState } from "react";

export default function CategoryBar({ onSearch, products = [] }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm1, setSearchTerm1] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const categories = [
        "All",
        "Clothing & Shoes",
        "Electronics",
        "Home & Garden",
        "Vintage",
        "Sports",
        "Toys & Games",
        "Books"
    ];

    // Create suggestions from the products fetched from MongoDB
    const suggestions = searchTerm1.trim()
        ? products
              .filter((product) => {
                  const text = [
                      product.brand,
                      product.title,
                      product.keyword,
                      product.keywords,
                      product.category
                  ]
                      .flatMap((field) =>
                          Array.isArray(field) ? field : [field]
                      )
                      .filter((field) => field != null)
                      .join(" ")
                      .toLowerCase();

                  return text.includes(searchTerm1.trim().toLowerCase());
              })
              .slice(0, 6)
        : [];

    const handleSearch = (term = searchTerm1) => {
        onSearch(term);
        setShowSuggestions(false);
    };

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-8xl mx-auto px-4 md:px-6 py-2 flex flex-col gap-3">

                {/* CATEGORIES */}
                <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full shrink-0 ${
                                activeCategory === category
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* SEARCH */}
                <div className="flex items-start gap-2">
                    <div className="relative flex-1 min-w-0">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
                            value={searchTerm1}
                            onChange={(e) => {
                                setSearchTerm1(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }

                                if (e.key === "Escape") {
                                    setShowSuggestions(false);
                                }
                            }}
                        />

                        {/* LIVE SUGGESTIONS */}
                        {showSuggestions && searchTerm1.trim() && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-72 overflow-y-auto">
                                {suggestions.length > 0 ? (
                                    suggestions.map((product) => (
                                        <button
                                            key={product._id || product.id}
                                            type="button"
                                            onClick={() => {
                                                setSearchTerm1(product.title || "");
                                                handleSearch(product.title || "");
                                            }}
                                            className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-100"
                                        >
                                            <img
                                                src={product.image}
                                                alt=""
                                                className="w-10 h-10 object-contain"
                                            />

                                            <span className="text-sm text-gray-800">
                                                {product.title}
                                            </span>
                                        </button>
                                    ))
                                ) : (
                                    <p className="p-3 text-sm text-gray-500">
                                        No matching products found
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shrink-0"
                        onClick={() => handleSearch()}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
