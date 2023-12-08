import Layout from '../layout/layout';
import { returnValue } from "../profile/login";
import React, { useState } from "react"; // Removed `handleSearch` from import
import axios from "axios";
import { useAuth } from '../Uits/authContext';
import NavBar from '../layout/navibar';
import { useEffect } from 'react';


export default function Home() {
  const [deliveries, setDeliveries] = useState([]);
  const [searchArea, setSearchArea] = useState("k");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [pickedUpId, setPickedUpId] = useState("");
  const { user, logout, checkUser } = useAuth();
  var storedUser;
 



  useEffect(() => {
    storedUser = JSON.parse(localStorage.getItem('user'));
    setemail(storedUser.email);
    // This code will run when the component mounts (including when the page is refreshed)
    handleSearch(); // Example function call
    // ... any other function calls you want to execute
  }, []); // The empty dependency array means this effect runs only once


  async function ForView() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVERY}orders/${searchArea}`);
      console.log(response.data);
      setDeliveries(response.data);
     
      
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("No data found at this location"); 
      } else {
        console.error(error);
        setErrorMessage("Error occurred Backend during search"); 
      }
  }
  }
  const handleSearch = () => {
    if(!searchArea.trim()){
      
      setErrorMessage("Enter location To get parsel"); 
    }
    else{
      ForView();
      
    }
   
  };
  const handlePickedUpClick = async (id) => {
    // Show an alert message with the confirmation
    const confirmationMessage = `Are you sure you want to mark delivery ID ${id} as picked up?`;
    if (window.confirm(confirmationMessage)) {
      // If the user clicks "OK" in the alert, proceed with the pickup
      setPickedUpId(id); // Update the pickedUpId state variable with the selected ID
      await Pickup(); // Wait for the Pickup function to complete
      setErrorMessage(`Delivery ID ${pickedUpId} marked as picked up.`);
    } else {
      // If the user clicks "Cancel" in the alert, do nothing
      setErrorMessage(""); // Clear any previous error messages
    }
    
  async function Pickup() {
    try {
      const data = {
       
        Status: "in-progress",
        delivaryManEmail: email,
        id: `${id}`
        
      };
      console.log(data);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_DELIVERY}updatestatus`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setDeliveries(response.data);
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("No data found at this location"); 
      } else {
        console.error(error);
        setErrorMessage("Error occurred Backend during registration."); 
      }
  }
  }
  };
  


  return (
    <>
      <Layout page="Home">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  
  
  <div className="flex items-center mb-4 flex flex-col items-center">
  
  <h1 className="text-2xl font-semibold mb-4">Available Delivery Item List</h1>
    <input
      type="text"
      value={searchArea}
      onChange={(e) => {
        setSearchArea(e.target.value);
        handleSearch(); // Call handleSearch whenever the input value changes
      }}
      placeholder="Search by Area"
      
      className="w-half p-2 border rounded focus:outline-none focus:border-blue-400"
    />
    <button
      onClick={handleSearch}
      className="ml-2 p-2 bg-blue-500 text-white rounded focus:outline-none hover:bg-blue-600"
    >
      Search
    </button>
  </div>
  
  <h1 className="text-red-500">{errorMessage}</h1>
  
  <ul className="grid grid-cols-2 gap-4  custom-grid">
  {deliveries.length > 0 ? (
    deliveries.map((delivery) => (
      <li key={delivery.id} className="border rounded p-4">
        <h2 className="text-xl font-semibold">{delivery.Product}</h2>
        <p>Seller: {delivery.Seller}</p>
        <p>Receiver: {delivery.Receiver}</p>
        <p>Address: {delivery.Address}</p>
        <p>Area: {delivery.Area}</p>
        <p>Phone: {delivery.phone}</p>
        <p>Status: {delivery.Status}</p>
        <p>ID: {delivery.id}</p>
        <button
          onClick={() => handlePickedUpClick(delivery.id)}
          className="mt-2 p-2 bg-green-500 text-white rounded focus:outline-none hover:bg-green-600"
        >
          Picked Up
        </button>
      </li>
    ))
  ) : (
    <li></li>
  )}
</ul>
</div>

      </Layout>
    </>
  );
}
