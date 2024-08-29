import React from 'react';


const ShoppingSite = () => {
  // Sample data for products
  const products = [
    { id: 1, name: 'Product 1', price: '$10.00', description: 'Description for product 1' },
    { id: 2, name: 'Product 2', price: '$15.00', description: 'Description for product 2' },
    { id: 3, name: 'Product 3', price: '$20.00', description: 'Description for product 3' },
    { id: 4, name: 'Product 4', price: '$25.00', description: 'Description for product 4' },
  ];

  return (
    <div className="shopping-site">
      <h1>Welcome to the Shopping Site</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <button className="buy-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingSite;
