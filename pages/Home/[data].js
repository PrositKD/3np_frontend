 
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
      <h2>Order Details</h2>
      {orderDetails ? (
        <div>
          <p>Order ID: {orderDetails.id}</p>
          <p>Seller: {orderDetails.Seller}</p>
          <p>Receiver: {orderDetails.Receiver}</p>
          <p>Product: {orderDetails.Product}</p>
          <p>Time: {orderDetails.Time}</p>
          <p>Address: {orderDetails.Address}</p>
          <p>Area: {orderDetails.Area}</p>
          <p>Phone: {orderDetails.phone}</p>
          <p>Status: {orderDetails.Status}</p>
        </div>
      ) : (
        <p>Loading order details...
        Data received through param: {data}</p> 
      )}
      </Layout>
    </div>
  );
};

export default OrderDetails;
