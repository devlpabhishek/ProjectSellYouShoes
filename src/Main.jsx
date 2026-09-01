import React from 'react';
import './output.css';
// import Navbar from './Navbar'; (Assuming you use this elsewhere)
import img1 from './Assets/img1.jpg';
import img2 from './Assets/img2.jpg';
import img3 from './Assets/img3.jpg';


export default function Main() {
    return (
        // Added a max-width and horizontal padding (px-4) so it doesn't touch screen edges on mobile
        <div className="w-full pb-20">

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
                    <h1 className='text-2xl font-bold'>You are one step closer to selling your old shoes.....</h1>
                    <p className='text-lg mt-4 text-gray-700'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid provident beatae ea molestiae perspiciatis hic maiores ad possimus libero perferendis dolorum doloremque officiis error quos voluptatum, deleniti saepe, quasi dicta.
                    </p>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid provident beatae ea molestiae perspiciatis hic maiores ad possimus libero perferendis dolorum doloremque officiis error quos voluptatum, deleniti saepe, quasi dicta.
                    </p>
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
                </div>
            </div>

        </div>
    );
}