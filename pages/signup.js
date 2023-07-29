import React, { useState } from "react";

const DelivaryManRegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [chargePerUnit, setChargePerUnit] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{12}$/; // phone numbers are 11 digits long
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

    // Perform validation here
    if (!name.trim()) {
      setErrorMessage("Name is required");
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address");
    } else if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage("Invalid phone number");
    } else if (!chargePerUnit.trim()) {
      setErrorMessage("Charge per unit is required");
    } else if (!vehicle) {
      setErrorMessage("Please select a vehicle");
    } else if (!address.trim()) {
      setErrorMessage("Address is required");
    } else if (!gender) {
      setErrorMessage("Please select a gender");
    } else if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else if (!photo) {
      setErrorMessage("Photo is required");
    } else {
      // Registration logic (you can handle the data submission here)
      setErrorMessage("Registration successful!");
    }
  };

  return (
    <div>
      <h2>Delivery Man Registration</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleRegistration}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Charge per Unit:</label>
          <input
            type="text"
            value={chargePerUnit}
            onChange={(e) => setChargePerUnit(e.target.value)}
          />
        </div>
        <div>
          <label>Vehicle:</label>
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            <option value="">Select Vehicle</option>
            <option value="bike">Bike</option>
            <option value="cycle">Cycle</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default DelivaryManRegistrationPage;
