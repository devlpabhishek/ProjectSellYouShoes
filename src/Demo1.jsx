import React from 'react';
import ProductGrid from './Products.json';

export default function Demo1() {
    // 1. The parenthesis is now safely on the same line as return
    return (
        <div>
            {ProductGrid.map((product) => (
                <div key={product.id}>
                    
                    {/* 2. Changed .name to .title */}
                    <h2>{product.title}</h2> 
                    
                    {/* 3. Placed the image URL inside a proper <img> tag */}
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        style={{ width: "200px" }} // Added a quick size limit so it doesn't take up the whole screen
                    />
                    
                </div>
            ))}
        </div>
    );
}