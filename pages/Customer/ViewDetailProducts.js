import React, { useState } from "react";

export default function View_Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product

  // ... your existing code ...

  return (
    <>
      <Layout page="about">
        <div>
          <h2>Product List</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {/* ... existing code ... */}
                <button onClick={() => setSelectedProduct(product)}>View Details</button>
              </li>
            ))}
          </ul>
        </div>
        {selectedProduct && (
          <div>
            <h2>Product Details</h2>
            <img src={selectedProduct.photoPath} alt={selectedProduct.name} />
            <h3>{selectedProduct.name}</h3>
            <p>{/* Display other product details here */}</p>
            <button onClick={() => setSelectedProduct(null)}>Close Details</button>
          </div>
        )}
        {/* ... your existing code ... */}
      </Layout>
    </>
  );
}
