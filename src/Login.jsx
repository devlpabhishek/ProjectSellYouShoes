import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import back from './Assets/back.png';
import Footer from './Footer';

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        // Basic validation
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                'http://localhost:3001/login',
                {
                    email,
                    password
                }
            );

            console.log('Login response:', response.data);

            setSuccess('Login successful!');

            // Store logged-in user
            if (rememberMe) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
            } else {
                sessionStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
            }

            // Redirect after login
            setTimeout(() => {
                navigate('/userhome');
            }, 1000);

        } catch (error) {

            console.error('Login error:', error);

            if (error.response) {
                setError(
                    error.response.data.message ||
                    'Invalid email or password'
                );
            } else {
                setError(
                    'Unable to connect to server. Please make sure your backend is running.'
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <div className="text-center">

                {/* Back button */}
                <div className="flex items-center justify-start mb-4 mt-4 ml-4">
                    <Link
                        to="/"
                        className="hover:text-blue-500 text-blue-600 font-medium transition-colors"
                    >
                        <img
                            src={back}
                            alt="Back"
                            className="md:w-8 md:h-8 w-4 h-4"
                        />
                    </Link>
                </div>

                <h1 className="text-3xl font-bold">
                    Log In
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="mt-6 flex flex-col gap-4 justify-center items-center"
                >

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-70 md:w-100 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Remember Me */}
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) =>
                                setRememberMe(e.target.checked)
                            }
                            className="mr-2"
                        />

                        Remind Me
                    </label>

                    {/* Error message */}
                    {error && (
                        <p className="text-red-500">
                            {error}
                        </p>
                    )}

                    {/* Success message */}
                    {success && (
                        <p className="text-green-500">
                            {success}
                        </p>
                    )}

                    {/* Login button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="md:w-70 w-50 mx-auto mt-8 bg-green-500 hover:bg-white hover:text-green-500 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

            </div>

            <Footer />

        </div>
    );
}