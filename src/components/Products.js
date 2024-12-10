import React, { useState } from 'react';
import products from './products_with_diverse_images.json';
const Products = () => {
  const handleCaseChange = (e, partNumber) => {
    console.log(`Changed case quantity for ${partNumber}: ${e.target.value}`);
  };

  const addToCart = (partNumber) => {
    console.log(`Added ${partNumber} to cart.`);
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {products.map((product) => (
        <div key={product.partNumber} className='bg-white rounded-lg shadow-md overflow-hidden'>
          <img src={product.lampImage} alt={product.description} className='w-full h-48 object-cover' />

          <div className='p-4'>
            <h2 className='text-xl font-semibold'>{product.description}</h2>
            <p className='text-gray-700'>
              <strong>Part Number:</strong> {product.partNumber}
            </p>
            <p className='text-gray-700'>
              <strong>Location:</strong> {product.location}
            </p>
            <p className='text-gray-700'>
              <strong>Case Quantity:</strong> {product.caseQuantity}
            </p>
            <div className='mt-4 flex items-center'>
              <input type='number' value={product.numberOfCasesNeeded} onChange={(e) => handleCaseChange(e, product.partNumber)} className='border rounded w-16 p-1 mr-4 text-center' />
              <button onClick={() => addToCart(product.partNumber)} className='rounded-lg text-white btn border-none bg-[#4B449D] btn-sm h-full hover:bg-[#38327D]'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
