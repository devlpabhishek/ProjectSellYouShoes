import React from 'react'
import Navbar from './Navbar'
import CategoryBar from './Cate'
import Product from './Product'
import ProductGrid from './Product'


export default function Landing() {
  return (
    <div>
        <CategoryBar/>
        <Product />
    <div>This is the landing page</div>
    </div>
  )
}
