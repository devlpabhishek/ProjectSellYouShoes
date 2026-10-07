import React from 'react';
import Product from'./Product';
import YourPosts from './YourPosts';

export default function UserHome() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">
                Welcome {user?.firstName}
            </h1>
            <YourPosts />
            <h2 className="text-2xl font-semibold mt-8 mb-4">
                Your Products
            </h2>
<Product />
        </div>
    );
}