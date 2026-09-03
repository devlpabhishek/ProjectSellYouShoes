import React from 'react';
import './output.css';
// import Navbar from './Navbar'; (Assuming you use this elsewhere)
import img1 from './Assets/img1.jpg';
import img2 from './Assets/img2.jpg';
import img3 from './Assets/img3.jpg';
import { Link } from 'react-router-dom';


export default function Main() {
    return (
        // Added a max-width and horizontal padding (px-4) so it doesn't touch screen edges on mobile
        <div className="w-full pb-20">
            <div className="mt-8 text-center px-4 md:px-20">
                <p className='text-lg md:text-xl text-black-700'>
                    We built this platform to bridge that gap. We aren't just an e-commerce site; we are a circular marketplace built by and for our users. By cutting out the middleman, we empower you to shop directly from one another. Our mission is simple: make buying and selling second-hand as easy, safe, and thrilling as buying brand new. Join us in redefining retail—one pre-loved treasure at a time.
                </p>
            </div>
            {/* SECTION 1 */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 mt-4 md:mt-6 shadow-lg p-6 md:p-10 rounded-xl'>
                {/* Changed size-140 to w-full md:w-1/2 */}
                <div className="w-full md:w-1/3 bg-gray-50">
                    <img
                        src={img1}
                        alt="User Profile"
                        className="object-cover shadow-lg mx-auto w-full h-auto rounded-xl"
                    />
                </div>
                <div className="w-full md:w-1/2 bg-gray-50">
                    <h1 className='text-2xl font-bold'>Buy That PlayStation You Always Wanted</h1>
                    <p className='text-lg mt-4 text-gray-700'>
                        Welcome to ShopMate, the community-driven marketplace where the best finds aren’t sitting on store shelves—they’re in each other's homes. We created a space where you can turn your unworn clothes, unread books, and unused gadgets into cash, all while scoring incredible deals from people just like you. It’s more than just shopping; it’s a sustainable, circular economy that keeps great items out of landfills and puts money directly into the pockets of our community.
                    </p>
                    <Link to="/landing" className='text-lg mt-4 text-blue-500 font-bold hover:text-blue-700 cursor-pointer transition-colors'>
                        Check Now...
                    </Link>
                </div>
            </div>

            {/* SECTION 2 (Text Left, Image Right on Desktop) */}
            {/* Added md:flex-row-reverse so the image stays on top on mobile, but moves to the right on desktop */}
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-8 md:gap-6 mt- shadow-lg p-6 md:p-10 rounded-xl'>
                <div className="w-full md:w-1/3 bg-gray-50">
                    <img
                        src={img2}
                        alt="User Profile"
                        className="object-cover shadow-lg mx-auto w-full h-auto rounded-xl"
                    />
                </div>
                <div className="w-full md:w-1/2 bg-gray-50">
                    <h1 className='text-2xl font-bold'>You are one step closer to selling your old shoes.....</h1>
                    <p className='text-lg mt-4 text-gray-700'>
                        Your next favorite thing is currently in someone else’s closet.
                        Sub-headline: Buy, sell, and connect. Join the community marketplace where we shop from each other.
                    </p>
                    <Link to="/landing" className='text-lg mt-4 text-blue-500 font-bold hover:text-blue-700 cursor-pointer transition-colors'>
                        Check Now...
                    </Link>
                </div>
            </div>

            {/* SECTION 3 */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16 mt- shadow-lg p-6 md:p-10 rounded-xl'>
                <div className="w-full md:w-1/3 bg-gray-50">
                    <img
                        src={img3}
                        alt="User Profile"
                        className="object-cover shadow-lg mx-auto w-full h-auto rounded-xl"
                    />
                </div>
                <div className="w-full md:w-1/2 bg-gray-50">
                    <h1 className='text-2xl font-bold'>You are one step closer to selling your old shoes.....</h1>
                    <p className='text-lg mt-4 text-gray-700'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid provident beatae ea molestiae perspiciatis hic maiores ad possimus libero perferendis dolorum doloremque officiis error quos voluptatum, deleniti saepe, quasi dicta.
                    </p>
                    <Link to="/landing" className='text-lg mt-4 text-blue-500 font-bold hover:text-blue-700 cursor-pointer transition-colors'>
                        Check Now...
                    </Link>
                </div>
            </div>

        </div>
    );
}