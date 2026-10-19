import React from 'react'
import { Link } from 'react-router-dom'
import back from './Assets/back.png'


export default function AddProducts() {
    return (
        <div className='max-w-10xl mx-auto p-4 md:p-7 bg-gray-50'>
            <div className='flex'>
                <Link to="/createpost" className='bg-blue-600 text-white rounded px-2.5 py-2 hover:bg-white hover:text-blue-600 cursor-pointer '>Add products</Link>
            </div>
        </div>
    )
}
