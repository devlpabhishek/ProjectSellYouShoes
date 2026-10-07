import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Product Card
function ProductCard({ products }) {
    const [wishlist, setWishlist] = useState(false);

    return (
        <div className="bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer relative group flex flex-col">

            {/* Wishlist Heart Icon */}
            <button
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
            <div className="h-48 w-full p-4 flex items-center justify-center">
                <img
                    src={products.image}
                    alt={products.title}
                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow border-t border-gray-100">

                <span className="text-sm text-gray-500 font-medium mb-1">
                    {products.brand}
                </span>

                <h3 className="text-sm text-gray-900 group-hover:text-blue-600 line-clamp-2 h-10 mb-2">
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
                <div className="flex items-baseline gap-2 mb-1 mt-auto">
                    <span className="text-lg font-bold text-gray-900">
                        {products.price}
                    </span>

                    <span className="text-sm text-gray-500 line-through">
                        {products.originalPrice}
                    </span>

                    <span className="text-sm font-bold text-green-600">
                        {products.discount}
                    </span>
                </div>

                <div className="text-xs text-gray-700 mt-1">
                    Free delivery
                </div>
            </div>
        </div>
    );
}

// Main Product Grid
export default function ProductGrid() {

    // Store products fetched from MongoDB
    const [products, setProducts] = useState([]);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3001/products'
                );

                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className='flex'>
                <Link to="/createpost" className='bg-blue-600 text-white rounded px-2.5 py-2 hover:bg-white hover:text-blue-600 cursor-pointer '>Add products</Link>
            </div>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">

                <h2 className="text-xl font-semibold mb-6">
                    Trending Offers
                </h2>

                <div className="flex items-center gap-2 w-full md:w-auto">

                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="border border-gray-300 p-2 rounded w-full max-w-md focus:outline-none focus:border-blue-500"
                    />

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() =>
                            alert('Search functionality not implemented yet.')
                        }
                    >
                        Search
                    </button>

                </div>
            </div>

            {/* products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {products.map((products) => (
                    <ProductCard
                        key={products._id}
                        products={products}
                    />
                ))}

            </div>

            <Footer />
        </div>
    );
}