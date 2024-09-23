import React from 'react';
import './ShoppingSite.css';

const ShoppingSite = () => {
  return (
    <div className="shopping-homepage">
      <header className="header">
        <div className="logo">
          <img src="/api/placeholder/120/50" alt="Your Shop" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search products" />
          <button className="search-button">Search</button>
        </div>
        <nav className="nav-links">
          <a href="#">Hello, Sign in</a>
          <a href="#">Orders</a>
          <a href="#">Cart</a>
        </nav>
      </header>

      <nav className="category-nav">
        <ul>
          <li><a href="#">All Products</a></li>
          <li><a href="#">Top Sellers</a></li>
          <li><a href="#">New Arrivals</a></li>
          <li><a href="#">Fashion</a></li>
          <li><a href="#">Electronics</a></li>
          <li><a href="#">Offers</a></li>
          <li><a href="#">Support</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <section className="hero-section">
          <img src="/api/placeholder/1200/300" alt="Banner" className="hero-image" />
        </section>

        <section className="product-grid">
          <div className="product-card">
            <img src="/api/placeholder/200/200" alt="Product 1" />
            <h3>Product 1</h3>
            <p>₹999</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="/api/placeholder/200/200" alt="Product 2" />
            <h3>Product 2</h3>
            <p>₹1,499</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="/api/placeholder/200/200" alt="Product 3" />
            <h3>Product 3</h3>
            <p>₹799</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="/api/placeholder/200/200" alt="Product 4" />
            <h3>Product 4</h3>
            <p>₹2,999</p>
            <button>Add to Cart</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Payment Methods</a></li>
            <li><a href="#">Help & Support</a></li>
          </ul>
        </div>
        <div className="copyright">
          <p>&copy; 2024, YourShop.com, All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default ShoppingSite;
