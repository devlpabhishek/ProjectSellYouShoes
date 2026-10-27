import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryBar from './Cate';
import { Link } from 'react-router-dom';

// Product Card
function ProductCard({ products }) {
    const [wishlist, setWishlist] = useState(false);
    const navigate = useNavigate();



    return (
        <div className="bg-gray-100 rounded-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer relative group flex flex-col w-full min-w-0">

            {/* Wishlist Heart Icon */}
            <button
                type="button"
                aria-label="Toggle wishlist"
                className={`absolute top-3 right-3 z-10 ${wishlist
                    ? 'text-red-500'
                    : 'text-gray-300 hover:text-red-500'
                    }`}
                onClick={() => setWishlist(!wishlist)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            </button>

            {/* Product Image */}
            <div className="h-36 sm:h-40 md:h-48 w-full p-3 sm:p-4 flex items-center justify-center">
                <img
                    src={products.image}
                    alt={products.title}
                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Details */}
            <Link
                to={`/productdetails/${products._id || products.id}`}
                className="p-3 sm:p-4 flex flex-col flex-grow border-t border-gray-100 min-w-0"
            >
                <span className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                    {products.brand}
                </span>

                <h3 className="text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 line-clamp-2 min-h-10 mb-2">
                    {products.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold flex items-center gap-0.5">
                        {products.rating}

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3 h-3"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                {/* Price */}
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1 mt-auto">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                        {products.price}
                    </span>

                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                        {products.originalPrice}
                    </span>

                    <span className="text-xs sm:text-sm font-bold text-green-600">
                        {products.discount}
                    </span>
                </div>

                <div className="text-xs text-gray-700 mt-1">
                    Free delivery
                </div>
            </Link>
        </div>
    );
}

// Main Product Grid
export default function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    // Fetch products from MongoDB
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setFetchError(false);

                const API_URL = process.env.REACT_APP_API_URL;

                const response = await axios.get(
                    `${API_URL}/products`
                );

                if (!Array.isArray(response.data)) {
                    console.error(
                        "Expected an array of products:",
                        response.data
                    );

                    setProducts([]);
                    setFetchError(true);
                    return;
                }

                setProducts(response.data);
                console.log("Products fetched successfully:", response.data);
            } catch (error) {
                console.error(
                    "Error fetching products:",
                    error.response?.data || error.message
                );

                setProducts([]);
                setFetchError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Receive search term from CategoryBar
    const handleSearch = (term) => {
        setSearchTerm(term.trim().toLowerCase());
        setHasSearched(true);
    };

    // Filter products using brand, title and keywords
    const filteredProducts = products.filter((product) => {
        const searchableFields = [
            product.brand,
            product.title,
            product.keyword,
            product.keywords,
            product.category,
            product.id
        ];

        const searchableText = searchableFields
            .flatMap((field) =>
                Array.isArray(field) ? field : [field]
            )
            .filter(
                (field) => field !== null && field !== undefined
            )
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            !searchTerm || searchableText.includes(searchTerm);

        // IMPORTANT: return determines which products remain
        return matchesSearch;
    });

    return (
        <div className="max-w-8xl mx-auto p-2 md:p-2 bg-gray-200 min-h-screen rounded-md">

            {/* Category Bar and Search */}
            <CategoryBar
                onSearch={handleSearch}
                products={products}
            />

            {/* PRODUCTS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {loading ? (
                    <p className="col-span-full text-center p-6">
                        Loading products...
                    </p>
                ) : fetchError ? (
                    <p className="col-span-full text-center p-6 text-red-600">
                        Unable to fetch products. Please check your backend server and MongoDB connection.
                    </p>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id || product.id}
                            products={product}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center p-6">
                        {hasSearched
                            ? `No products found for "${searchTerm}"`
                            : "No products available"}
                    </p>
                )}

            </div>
        </div>
    );
}
