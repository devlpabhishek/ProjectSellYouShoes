import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import back from './Assets/back.png';
import Footer from './Footer';

export default function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAccepted, setIsAccepted] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        // 1. Check password
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // 2. Check terms
        if (!isAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        try {

            // 3. Send data to backend
            const result = await axios.post(
                'http://localhost:3001/users',
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword
                }
            );

            console.log('Server response:', result.data);

            // 4. Only show success after successful API request
            alert('You have successfully signed up!');

        } catch (error) {

            console.error('Registration error:', error);

            if (error.response) {
                alert(
                    error.response.data.message ||
                    'Registration failed'
                );
            } else {
                alert('Cannot connect to backend server');
            }
        }
    };

    return (
        <div className="text-center">

            <div className="flex items-center justify-start mb-4 md:mr-16 mt-4 ml-4">

                <Link to="/">
                    <img
                        src={back}
                        alt="Back"
                        className="md:w-8 md:h-8 w-4 h-4"
                    />
                </Link>

            </div>

            <h1 className="text-3xl font-bold">
                Sign Up
            </h1>

            <form onSubmit={handleRegister}>

                <div className="mt-6 flex flex-col gap-4 justify-center items-center">

                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    <label>

                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={isAccepted}
                            onChange={(e) =>
                                setIsAccepted(e.target.checked)
                            }
                        />

                        I accept the terms and conditions

                    </label>

                    <button
                        type="submit"
                        className="md:w-70 w-50 mx-auto mt-8 bg-green-500 hover:bg-white hover:text-green-500 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                        Sign Up
                    </button>

                </div>

            </form>

            <Footer />

        </div>
    );
}