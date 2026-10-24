
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch the selected product from MongoDB
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    `https://projectsellyoushoes-2.onrender.com/products/${productId}`
                );

                setProduct(response.data);
            } catch (err) {
                console.error(
                    "Error fetching product details:",
                    err.response?.data || err.message
                );

                setError("Unable to load product details.");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        } else {
            setError("Product ID is missing.");
            setLoading(false);
        }
    }, [productId]);

    // Add the selected product to the cart
    const handleAddToCart = async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            const userId = user?.id || user?._id;

            if (!userId) {
                alert("Please log in to add products to your cart.");
                return;
            }

            await axios.post("https://projectsellyoushoes-2.onrender.com/cart/add", {
                userId,
                productId: String(product._id || product.id),
                title: product.title,
                brand: product.brand,
                image: product.image,
                price: product.price
            });

            alert("Product added to cart successfully!");
        } catch (err) {
            console.error(
                "Add to cart error:",
                err.response?.data || err.message
            );

            alert(
                err.response?.data?.message ||
                "Unable to add product to cart."
            );
        }
    };

    // Buy Now: add product to cart and open the cart page
    const handleBuyNow = async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            const userId = user?.id || user?._id;

            if (!userId) {
                alert("Please log in to continue.");
                return;
            }

            await axios.post("https://projectsellyoushoes-2.onrender.com/cart/add", {
                userId,
                productId: String(product._id || product.id),
                title: product.title,
                brand: product.brand,
                image: product.image,
                price: product.price
            });

            navigate("/cart");
        } catch (err) {
            console.error(
                "Buy now error:",
                err.response?.data || err.message
            );

            alert(
                err.response?.data?.message ||
                "Unable to continue. Please try again."
            );
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-600">
                    Loading product details...
                </p>
            </div>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p className="text-red-600">
                    {error || "Product not found."}
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="rounded bg-gray-900 px-5 py-2 text-white"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">

            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-5 text-sm font-medium text-blue-700 hover:underline"
            >
                ← Back to Products
            </button>

            {/* Product Details */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 rounded-lg bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">

                {/* Large Product Image */}
                <div className="flex min-h-80 items-center justify-center bg-white p-4 md:min-h-[450px]">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[450px] w-full object-contain"
                    />
                </div>

                {/* Product Information */}
                <div className="flex flex-col">

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        {product.brand}
                    </p>

                    <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    {product.rating != null && (
                        <div className="mb-4">
                            <span className="rounded bg-green-600 px-2 py-1 text-sm font-semibold text-white">
                                {product.rating} ★
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="text-3xl font-bold text-gray-900">
                            {product.price}
                        </span>

                        {product.originalPrice != null && (
                            <span className="text-lg text-gray-500 line-through">
                                {product.originalPrice}
                            </span>
                        )}

                        {product.discount && (
                            <span className="text-sm font-bold text-green-600">
                                {product.discount}
                            </span>
                        )}
                    </div>

                    <p className="mb-5 text-sm text-gray-600">
                        Free delivery
                    </p>

                    <hr className="mb-5 border-gray-200" />

                    {/* Product Description */}
                    {product.description && (
                        <div className="mb-6">
                            <h2 className="mb-2 text-lg font-semibold">
                                Product Description
                            </h2>

                            <p className="leading-6 text-gray-600">
                                {product.description}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">

                        <button
                            onClick={handleAddToCart}
                            className="rounded-md bg-yellow-400 px-5 py-4 font-bold text-gray-900 transition hover:bg-yellow-500"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="rounded-md bg-orange-600 px-5 py-4 font-bold text-white transition hover:bg-orange-700"
                        >
                            Buy Now
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
