import React, { useState } from 'react';
import './ProductCatalogue.css'; // Make sure to create this CSS file
import applesImage from './apple.jpeg';

const products = [
  { id: 1, name: 'Apples', price: 1.99, category: 'Fruits', image: applesImage },
  { id: 2, name: 'Milk', price: 2.49, category: 'Dairy', image: '/path/to/milk-image.jpg' },
  { id: 3, name: 'Bread', price: 2.19, category: 'Bakery', image: '/path/to/bread-image.jpg' },
  { id: 4, name: 'Chicken', price: 5.99, category: 'Meat', image: '/path/to/chicken-image.jpg' },
  { id: 5, name: 'Spinach', price: 1.79, category: 'Vegetables', image: '/path/to/spinach-image.jpg' },
];

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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