import React, { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

const fetchProductsFromAPI = () => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Product 1",
          details: "Product 1 details",
          price: 10.99,
          photo: "/1.jpg", // Replace with the actual photo URL or data
        },
        {
          id: 2,
          name: "Product 2",
          details: "Product 2 details",
          price: 19.99,
          photo: "/2.jpg", // Replace with the actual photo URL or data
        },
        // Add more product data as needed
      ]);
    }, 1000); // Simulating an asynchronous API call with a 1-second delay
  });
};

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch the list of products from your API or backend
    fetchProductsFromAPI()
      .then((data) => {
        setProducts(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
