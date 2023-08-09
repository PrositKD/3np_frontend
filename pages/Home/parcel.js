import Link from 'next/link';
import Image from 'next/image';
import Layout from '../layout/layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Parcel() {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchArea = 'prosit.kdd@gmail.com';

  useEffect(() => {
    ForView();
  }, []);

  async function ForView() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DELIVERY}myorders/${searchArea}`
      );
      console.log(response.data);
      setOrders(response.data);

      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('No data found at your id');
      } else {
        console.error(error);
        setErrorMessage('Error occurred Backend during registration.');
      }
    }
  }
  
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const payload = {
        Status: newStatus
      };
      console.log('Request Payload:', payload);
  
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DELIVERY}updatedelivary/${orderId}`,
        payload
      );
      console.log('Response:', response.data);
      if (response.data) {
        const confirmResult = window.confirm(
          'Order status updated and email send successfully. Do you want to refresh the order list?'
        );

        if (confirmResult) {
          ForView();
        }
    }
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  
   
  return (
    <Layout page="parcel">
  <div>
    <h2>Order List</h2>
    <h1>{errorMessage}</h1>
    {orders.length === 0 ? (
      <p>You have no orders.</p>
    ) : (
      orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>Order ID: {order.id}</h3>
          <p>Seller: {order.Seller}</p>
          <p>Receiver: {order.Receiver}</p>
          <p>Product: {order.Product}</p>
          <p>Address: {order.Address}</p>
          <p>Area: {order.Area}</p>
          <p>Phone: {order.phone}</p>
          <p>Status: {order.Status}</p>
          <p>Delivery Man Email: {order.Delivary_man.email}</p>

          {/* Buttons for updating order status */}
          <button onClick={() => handleStatusUpdate(order.id, 'completed')}>
            Mark Completed
          </button>
          <button onClick={() => handleStatusUpdate(order.id, 'rejected')}>
            Mark Rejected
          </button>
        </div>
      ))
    )}
  </div>
</Layout>

  );
}
