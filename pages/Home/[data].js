 
 import Layout from '../layout/layout';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import axios from 'axios';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const router = useRouter(); // Initialize the useRouter hook
  const { data } = router.query; // Access the 'data' query parameter from the router

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVERY}product/${data}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
       <Layout page="Dynamic Page">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Order Details</h2>
    {orderDetails ? (
      <div className="bg-gradient-to-r from-blue-200 to-purple-200 p-6 rounded-lg shadow-md">
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Order ID:</span> {orderDetails.id}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Seller:</span> {orderDetails.Seller}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Receiver:</span> {orderDetails.Receiver}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Product:</span> {orderDetails.Product}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Time:</span> {orderDetails.Time}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Address:</span> {orderDetails.Address}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Area:</span> {orderDetails.Area}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Phone:</span> {orderDetails.phone}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-blue-600">Status:</span> {orderDetails.Status}
        </p>
      </div>
    ) : (
      <p className="text-gray-600">Loading order details... Data received through param: {data}</p>
    )}
  </div>
</Layout>


    </div>
  );
};

export default OrderDetails;
