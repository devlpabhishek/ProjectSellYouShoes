import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function YourPosts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {

            // Get logged-in user
            const storedUser = localStorage.getItem('user');

            if (!storedUser) {
                setError('Please login first.');
                setLoading(false);
                return;
            }

            const user = JSON.parse(storedUser);

            // Check user ID
            if (!user.id) {
                setError('User ID not found. Please login again.');
                setLoading(false);
                return;
            }

            console.log('Logged-in user:', user);
            console.log('Fetching posts for user:', user.id);

            // Fetch user's posts from backend
            const response = await axios.get(
                `http://localhost:3001/userposts/${user.id}`
            );

            console.log('Posts received from backend:', response.data);

            setPosts(response.data);

        } catch (error) {

            console.error('Error fetching user posts:', error);

            if (error.response) {

                console.error(
                    'Backend error:',
                    error.response.data
                );

                setError(
                    error.response.data.message ||
                    'Failed to fetch your posts.'
                );

            } else {

                setError('Cannot connect to backend.');

            }

        } finally {

            setLoading(false);

        }
    };

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <p className="text-gray-500 text-lg">
                    Loading your posts...
                </p>

            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white border border-red-200 rounded-xl p-6">

                        <h2 className="text-lg font-semibold text-red-600">
                            Something went wrong
                        </h2>

                        <p className="text-gray-600 mt-2">
                            {error}
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">

            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-6">

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Your Posts
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Items you have listed on ShopMate.
                    </p>

                </div>

                {/* No posts */}
                {posts.length === 0 ? (

                    <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">

                        <h2 className="text-lg font-semibold text-gray-800">
                            You haven't posted anything yet.
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Create your first listing to start selling.
                        </p>

                    </div>

                ) : (

                    /* Posts */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {posts.map((post) => (

                            <div
                                key={post._id}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                            >

                                {/* Image */}
                                {post.images && post.images.length > 0 ? (

                                    <img
                                        src={post.images[0]}
                                        alt={post.title}
                                        className="w-full h-52 object-cover"
                                    />

                                ) : (

                                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center">

                                        <span className="text-gray-400">
                                            No image
                                        </span>

                                    </div>

                                )}

                                {/* Post information */}
                                <div className="p-5">

                                    {/* Category */}
                                    <p className="text-xs text-blue-600 font-medium uppercase">
                                        {post.category}
                                        {' • '}
                                        {post.subCategory}
                                    </p>

                                    {/* Title */}
                                    <h2 className="text-lg font-semibold text-gray-900 mt-2">
                                        {post.title}
                                    </h2>

                                    {/* Brand */}
                                    {post.brand && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Brand: {post.brand}
                                        </p>
                                    )}

                                    {/* Condition */}
                                    {post.condition && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Condition: {post.condition}
                                        </p>
                                    )}

                                    {/* Age */}
                                    {post.age && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Age: {post.age}
                                        </p>
                                    )}

                                    {/* Price */}
                                    <p className="text-xl font-bold text-gray-900 mt-3">
                                        ₹{Number(post.price).toLocaleString('en-IN')}
                                    </p>

                                    {/* Negotiable */}
                                    {post.negotiable && (
                                        <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                            Negotiable
                                        </span>
                                    )}

                                    {/* Location */}
                                    {post.city && (
                                        <p className="text-sm text-gray-500 mt-3">
                                            📍{' '}
                                            {post.locality
                                                ? `${post.locality}, ${post.city}`
                                                : post.city}
                                        </p>
                                    )}

                                    {/* Description */}
                                    {post.description && (
                                        <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                                            {post.description}
                                        </p>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

