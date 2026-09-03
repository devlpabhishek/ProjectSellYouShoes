import React from 'react';
import Demo1 from './Demo1';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import back from './Assets/back.png'; // Adjust the path to your back icon image

export default function Signup() {

    const [isAccepted, setIsAccepted] = useState(false);
    const clicked = () => {
        alert('You have successfully signed up!')
    }
    return (

    <div className="p-8 text-center">
        <div className="flex items-center justify-start mb-4 mr-4">
                <Link to="/" className="hover:text-blue-500 text-blue-600 font-medium transition-colors">
                    <img src={back} alt="Back" className="md:w-8 md:h-8 w-4 h-4" />
                </Link>
            </div>
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <div className="mt-6 flex flex-col gap-4 justify-center items-center">
            <input
                type="text"
                placeholder="First Name"
                className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Last Name"
                className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="email"
                placeholder="Email"
                className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label>
                <input
                    type="checkbox"
                    placeholder="I accept the terms and conditions"
                    className="mr-2"
                />
                I accept the terms and conditions

            </label>
            <Link to="/signup" onClick={clicked} className="md:w-70 w-50  mx-auto mt-8 bg-green-500 hover:bg-white hover:text-green-500 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm cursor-pointer ">
                Sign Up
            </Link>
        </div>
    </div>
);
}