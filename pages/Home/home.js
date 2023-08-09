import Layout from '../layout/layout';
import { returnValue } from "../profile/login";
import React, { useState } from "react"; // Removed `handleSearch` from import
import axios from "axios";

export default function Home() {
  const [deliveries, setDeliveries] = useState([]);
  const [searchArea, setSearchArea] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [pickedUpId, setPickedUpId] = useState("");
 
  

  async function ForView() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVERY}orders/${searchArea}`);
      console.log(response.data);
      setDeliveries(response.data);
      setemail("prosit.kdd@gmail.com");
      
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
        <h1>Hlw MR </h1>
        <h1>Delivery item List</h1>
        <input
  type="text"
  value={searchArea}
  onChange={(e) => {
    setSearchArea(e.target.value);
    handleSearch(); // Call handleSearch whenever the input value changes
  }}
  placeholder="Search by Area"
/>
<button onClick={handleSearch}>Search</button>
        <h1>{errorMessage}</h1>
      
        <ul>
  {deliveries.length > 0 ? (
    deliveries.map((delivery) => (
      <li key={delivery.id}>
        <h2>{delivery.Product}</h2>
        <p>Seller: {delivery.Seller}</p>
        <p>Receiver: {delivery.Receiver}</p>
              <p>Address: {delivery.Address}</p>
              <p>Area: {delivery.Area}</p>
              <p>Phone: {delivery.phone}</p>
              <p>Status: {delivery.Status}</p>
              <p>id:{delivery.id}</p>
              <button onClick={() => handlePickedUpClick(delivery.id)}>Picked_UP</button>
      </li>
    ))
  ) : (
    <li>Search Again to Pick Another</li>
  )}
</ul>
      </Layout>
    </>
  );
}
