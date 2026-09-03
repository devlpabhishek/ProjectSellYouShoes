import React from 'react';
import { Link } from 'react-router-dom';
import back from './Assets/back.png'; // Adjust the path to your back icon image

export default function Login() {

    const loggedin = () => {
        alert('You have successfully logged in!')
    }

    return (
        <div className="p-8 text-center">
            <div className="flex items-center justify-start mb-4 mr-4">
                <Link to="/" className="hover:text-blue-500 text-blue-600 font-medium transition-colors">
                    <img src={back} alt="Back" className="md:w-8 md:h-8 w-4 h-4" />
                </Link>
            </div>
            <h1 className="text-3xl font-bold">Log In</h1>
            <div className="mt-6 flex flex-col gap-4 justify-center items-center">
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
                <label>
                    <input
                        type="checkbox"
                        placeholder="Password"
                        className="mr-2"
                    />

                    Remind Me
                </label>

                <Link to="/signup" onClick={loggedin} className="md:w-70 w-50  mx-auto mt-8 bg-green-500 hover:bg-white hover:text-green-500 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm cursor-pointer ">
                    Login
                </Link>
            </div>
        </div>
    );
}