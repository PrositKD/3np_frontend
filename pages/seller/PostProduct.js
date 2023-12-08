import React, { useState } from "react";
import Image from "next/image";
import Link from 'next/link'
import Navigation from "./layout/navigation";
import Footer from "./layout/footer";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

  

    
    
    setProductName("");
    setProductDetails("");
    setProductPrice("");
    setProductPhoto(null);
    setIsSubmitted(true); 
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-4">Post Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Details:</label>
            <textarea
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              required
              className="p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Price:</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              className="p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductPhoto(e.target.files[0])}
              required
              className="p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          {productPhoto && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview:</h3>
              <Image
                src={URL.createObjectURL(productPhoto)}
                alt="Product Photo Preview"
                width={200}
                height={200}
              />
            </div>
          )}
          {isSubmitted && <p className="text-green-600">Product has been updated successfully!</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link href="/seller/Home" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Go back to Home
          </Link>
        </p>
      </div>
      <Footer />
    </div>

  );
};

export default ProductForm;
