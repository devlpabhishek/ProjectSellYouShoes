import React from 'react';
import Product from './Product';
import AddProducts from './AddProducts';
import MenuToggle from './MenuToggle';

export default function UserHome() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="text-center mt-10">
            <MenuToggle />
            <h1 className="text-3xl font-bold">
                Welcome {user?.firstName}
            </h1>
            <AddProducts />
            <Product />
        </div>
    );
}