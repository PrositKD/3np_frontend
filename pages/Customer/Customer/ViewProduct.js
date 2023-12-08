import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from '../Layout/layout';

export default function View_Product() {
  const [products, setProducts] = useState([]);


  var  storedUser;


  useEffect(() => {


    storedUser = JSON.parse(localStorage.getItem('user'));
    async function fetchData() {
      try {
        const email = storedUser.email;
        const response = await axios.get(`http://localhost:3000/customer/products/` + email);

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleReject = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/customer/delete_order/${productId}`);

      // Refresh the product list after deleting the order
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout page="about">
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="grid grid-cols-2 gap-6 max-w-6xl p-6">
          <div className="col-span-2 text-center mb-4">
            <h2 className="text-3xl font-bold">Product List</h2>
          </div>
          {products.map((product) => (
            <div key={product.id} className="flex space-x-4 p-4 bg-white rounded-lg shadow">
              <img
                src={`http://localhost:3000/customer/getimage/${product.photoPath}`}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                </div>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleReject(product.id)}
                    className="btn btn-danger"
                  >
                    Reject
                  </button>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
