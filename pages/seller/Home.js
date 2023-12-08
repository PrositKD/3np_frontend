import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./layout/navigation";
import Footer from "./layout/footer";
import UpdateProductForm from "./UpdateProductForm";

const UpdateProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SELLER}product/getProduct`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleUpdate = (productId) => {
    const selected = products.find((product) => product.id === productId);
    setSelectedProduct(selected);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_SELLER}product/delete/${productId}`);

      if (response.status === 200) {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Your Products</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded p-4 h-full">
              <p className="font-semibold">Name: {product.name}</p>
              <p className="text-gray-600">Details: {product.description}</p>
              <div className="mt-2">
                <img
                  src={`${process.env.NEXT_PUBLIC_SELLER}product/getImage/${product.photoPath}`}
                  alt={product.name}
                  className="max-w-full h-auto md:w-40 lg:w-60 mx-auto"
                />
              </div>
              <div className="mt-2">
                <button
                  onClick={() => handleUpdate(product.id)}
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <UpdateProductForm
          product={selectedProduct}
          onUpdate={() => {
            setSelectedProduct(null);
            fetchAllProducts();
          }}
        />
      )}
      <Footer />
    </div>
  );
};

export default UpdateProductPage;
