import React, { useState } from 'react';
import axios from 'axios';

const categoryData = {
    Fashion: [
        'Shoes',
        'T-Shirts',
        'Shirts',
        'Jackets',
        'Jeans',
        'Watches',
        'Bags'
    ],

    Electronics: [
        'Mobile Phones',
        'Laptops',
        'Tablets',
        'Headphones',
        'Cameras',
        'Gaming'
    ],

    Vehicles: [
        'Bikes',
        'Scooters',
        'Cars',
        'Bicycles',
        'Accessories'
    ],

    Home: [
        'Tables',
        'Chairs',
        'Sofas',
        'Beds',
        'Appliances',
        'Home Decor'
    ]
};

export default function CreatePost() {

    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState('');
    const [negotiable, setNegotiable] = useState(false);

    // All item details
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        condition: '',
        age: '',
        purchaseYear: '',
        description: '',
        city: '',
        locality: ''
    });

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSubCategory('');
    };

    // Handles all text/select fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            alert('You can upload maximum 5 images');
            return;
        }

        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const storedUser = localStorage.getItem('user');

            if (!storedUser) {
                alert('Please login first.');
                return;
            }

            const user = JSON.parse(storedUser);

            if (!user.id) {
                alert('User information is missing. Please login again.');
                return;
            }

            const postData = {
                userId: user.id,

                category: category,
                subCategory: subCategory,

                title: formData.title,
                brand: formData.brand,
                condition: formData.condition,
                age: formData.age,

                purchaseYear: formData.purchaseYear
                    ? Number(formData.purchaseYear)
                    : undefined,

                description: formData.description,

                price: Number(price),
                negotiable: negotiable,

                city: formData.city,
                locality: formData.locality,

                // Images are not being uploaded to MongoDB yet
                images: []
            };

            console.log('Sending post data:', postData);

            const response = await axios.post(
                'http://localhost:3001/userposts',
                postData
            );

            console.log('Server response:', response.data);

            alert('Listing created successfully!');

            // Reset form after successful submission
            setCategory('');
            setSubCategory('');
            setPrice('');
            setNegotiable(false);
            setImages([]);

            setFormData({
                title: '',
                brand: '',
                condition: '',
                age: '',
                purchaseYear: '',
                description: '',
                city: '',
                locality: ''
            });

        } catch (error) {
            console.error('Error creating listing:', error);

            if (error.response) {
                console.error('Backend error:', error.response.data);

                alert(
                    error.response.data.message ||
                    'Failed to create listing'
                );
            } else {
                alert('Cannot connect to backend.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">

            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-6">

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Sell an Item
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Create a listing and find someone who wants it.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm"
                >

                    {/* CATEGORY */}
                    <div className="p-6 border-b border-gray-200">

                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            What are you selling?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Category */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>

                                <select
                                    value={category}
                                    onChange={handleCategoryChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    {Object.keys(categoryData).map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* Sub Category */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sub-category
                                </label>

                                <select
                                    value={subCategory}
                                    onChange={(e) =>
                                        setSubCategory(e.target.value)
                                    }
                                    disabled={!category}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                                >

                                    <option value="">
                                        Select sub-category
                                    </option>

                                    {category &&
                                        categoryData[category].map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}

                                </select>

                            </div>

                        </div>

                    </div>


                    {/* PHOTOS */}
                    {/* 
                    Images are intentionally disabled for now.
                    We will connect this later with Cloudinary/image storage.
                    */}


                    {/* ITEM DETAILS */}
                    <div className="p-6 border-b border-gray-200">

                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Item details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Title */}
                            <div className="md:col-span-2">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Item title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Nike Air Max 270 Shoes"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                />

                            </div>


                            {/* Brand */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand
                                </label>

                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="e.g. Nike"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                />

                            </div>


                            {/* Condition */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Condition
                                </label>

                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                >

                                    <option value="">
                                        Select condition
                                    </option>

                                    <option value="new">
                                        New
                                    </option>

                                    <option value="like-new">
                                        Like New
                                    </option>

                                    <option value="good">
                                        Good
                                    </option>

                                    <option value="fair">
                                        Fair
                                    </option>

                                    <option value="used">
                                        Used
                                    </option>

                                </select>

                            </div>


                            {/* Age */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Item age
                                </label>

                                <select
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                >

                                    <option value="">
                                        Select age
                                    </option>

                                    <option value="less-than-6-months">
                                        Less than 6 months
                                    </option>

                                    <option value="6-12-months">
                                        6 - 12 months
                                    </option>

                                    <option value="1-2-years">
                                        1 - 2 years
                                    </option>

                                    <option value="2-5-years">
                                        2 - 5 years
                                    </option>

                                    <option value="5-plus-years">
                                        5+ years
                                    </option>

                                </select>

                            </div>


                            {/* Purchase Year */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Purchase year
                                </label>

                                <input
                                    type="number"
                                    name="purchaseYear"
                                    value={formData.purchaseYear}
                                    onChange={handleChange}
                                    min="1990"
                                    max={new Date().getFullYear()}
                                    placeholder="e.g. 2024"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                />

                            </div>

                        </div>

                    </div>


                    {/* DESCRIPTION */}
                    <div className="p-6 border-b border-gray-200">

                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Description
                        </h2>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            required
                            placeholder="Describe your item. Mention its condition, usage, defects, accessories included, reason for selling, etc."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 resize-none"
                        />

                        <p className="text-xs text-gray-400 mt-2">
                            Example: Used Nike shoes in good condition. Worn only a few times. No major damage. Original box available.
                        </p>

                    </div>


                    {/* PRICE */}
                    <div className="p-6 border-b border-gray-200">

                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Set your price
                        </h2>

                        <div className="max-w-md">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selling price
                            </label>

                            <div className="relative">

                                <span className="absolute left-3 top-2.5 text-gray-500">
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    min="1"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(e.target.value)
                                    }
                                    required
                                    placeholder="Enter price"
                                    className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2.5 focus:outline-none focus:border-blue-500"
                                />

                            </div>

                            <label className="flex items-center gap-2 mt-3 text-sm text-gray-600">

                                <input
                                    type="checkbox"
                                    checked={negotiable}
                                    onChange={(e) =>
                                        setNegotiable(e.target.checked)
                                    }
                                    className="w-4 h-4"
                                />

                                Price is negotiable

                            </label>

                        </div>

                    </div>


                    {/* LOCATION */}
                    <div className="p-6 border-b border-gray-200">

                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Location
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* City */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Mumbai"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                />

                            </div>

                            {/* Locality */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Area / Locality
                                </label>

                                <input
                                    type="text"
                                    name="locality"
                                    value={formData.locality}
                                    onChange={handleChange}
                                    placeholder="e.g. Kandivali East"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                                />

                            </div>

                        </div>

                        <p className="text-xs text-gray-400 mt-3">
                            For privacy, avoid entering your exact house address.
                        </p>

                    </div>


                    {/* SUBMIT */}
                    <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">

                        <div>

                            <p className="text-sm font-medium text-gray-700">
                                Ready to sell?
                            </p>

                            <p className="text-xs text-gray-400">
                                Check your information before posting.
                            </p>

                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Post Item
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
