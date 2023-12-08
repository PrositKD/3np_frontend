import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Uits/authContext";

function SProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [message, setMessage] = useState("");

const {user}=useAuth();

  var  storedUser;
 

  

  useEffect(() => {

    storedUser = JSON.parse(localStorage.getItem('user'));

    const email = storedUser.email;
    async function fetchProducts()
     {


      try {

        const response = await axios.get("http://localhost:3000/customer/getallproduct");
        setProducts(response.data);
        const email = storedUser.email;
        console.log(storedUser.email);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  

  const handleBuy = async (productId) => {

    
    console.log(productId);
    console.log(user.email);
    
    try {
      const response = await axios.get("http://localhost:3000/customer/buy", {
        productid: productId,
        email: user.email,
      });

      if (response.status === 200) {
        setMessage("Product purchase successful!");
      } else {
        setMessage("Product purchase failed.");
      }
    } catch (error) {
      console.error("Error purchasing product:", error);
      setMessage("Error occurred during purchase.");
    }
  };



  return (
    <div className="p-6">

<p>{message}</p>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={`http://localhost:3000/customer/getimage/${product.photoPath}`}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>

           
            <button
              onClick={() => handleBuy(product.id)}
              className="btn btn-primary mt-4"
            >
              Buy
            </button>
            

          </div>
        ))}
      </div>
      </div>
     
     
  );
}

export default SProductList;
