import React, { useContext, useState } from "react";
import { ProductContext } from ".               /ProductContext";

const GlobalSearchPage = () => {
  const products = useContext(ProductContext);

  // Wait until products are fetched before rendering the page
  if (!products) {
    return <div>Loading...</div>;
  }

  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Global Search</h2>
      <div>
        <input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <p>Name: {product.name}</p>
            <p>Details: {product.details}</p>
            <p>Price: {product.price}</p>
            <img src={product.photo} alt={`Product ${product.id}`} style={{ width: "100px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalSearchPage;
