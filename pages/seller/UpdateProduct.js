import React, { useState, useEffect } from "react";
import Header from "./layout/header";
import Footer from "./layout/footer";
import axios from 'axios';
import Link from 'next/link';
import UpdateProductForm from "./UpdateProductForm"; 
import Navigation from "./layout/navigation";

const UpdateProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SELLER}product/getProduct`); 
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleUpdate = (productId) => {
    const selected = products.find(product => product.id === productId);
    setSelectedProduct(selected);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_SELLER}product/delete/${productId}`);
      
      if (response.status === 200) {
        
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
      } 

      } catch (error) {
        
        console.error('Error deleting product:', error);
      }
  };

  return (
    <div>
      <Navigation></Navigation>
      <h1>Update Products</h1>
      <div>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>Name: {product.name}</p>
              <p>Details: {product.description}</p>
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_SELLER}product/getImage/${product.photoPath}`}
                  alt={product.name}
                  style={{ maxWidth: '200px' }} 
                />
                

                <Link href={`/product/${product.id}`} key={product.id}>
                  <h1>View Details</h1>
                </Link>

              </div>
              <div>
                <button onClick={() => handleUpdate(product.id)}>Update</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>


      <p>
        <Link href="/seller/Home">Go back to Home</Link>
      </p>
      <Footer /> {}
      {selectedProduct && (
        <UpdateProductForm
          product={selectedProduct}
          onUpdate={() => {
            
            setSelectedProduct(null); 
            fetchAllProducts();
          }}
        />
      )}   
    </div>
  );
};

export default UpdateProductPage;
