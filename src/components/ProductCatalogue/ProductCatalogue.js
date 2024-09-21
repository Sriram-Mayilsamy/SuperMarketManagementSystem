import React, { useState } from 'react';
import './ProductCatalogue.css'; // Make sure to create this CSS file
import products from '../Products/Products';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} className="product-image" />
    <div className="product-info">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  </div>
);

const ProductCatalogue = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const nameMatch = product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });

  return (
    <div className="product-catalogue">
      <h1 className="catalogue-title">Product Catalogue</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogue;
