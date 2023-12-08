import React, { useState } from "react";
import axios from "axios";

const UpdateProductForm = ({ product, onUpdate }) => {
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productPhotoPath, setProductPhotoPath] = useState(product.photoPath);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: product.id,
      name: productName,
      description: productDescription,
      photoPath: productPhotoPath,
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SELLER}product/update/${product.id}`,
        updatedProduct
      );

      if (response.data) {
        onUpdate(updatedProduct);
      } else {
        // Handle update error
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Product Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Product Photo Path:</label>
          <input
            type="text"
            value={productPhotoPath}
            onChange={(e) => setProductPhotoPath(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
