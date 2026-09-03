import React from 'react'
import Navbar from './Navbar'
import CategoryBar from './Cate'
import ProductGrid from './Product'

export default function Landing() {
  return (
    <div>
        <CategoryBar/>
        <ProductGrid/>
    <div>This is the landing page</div>
    </div>
  )
}
