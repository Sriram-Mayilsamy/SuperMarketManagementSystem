// SelectionPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const SelectionPage = () => {
  return (
    <div className="selection-page">
      <h2>Choose an Option</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/product-catalogue">Product Catalogue</Link>
        </li>
        <li>
          <Link to="/report-generation">Report Generation</Link>
        </li>
        <li>
          <Link to="/shopping">Shopping Site</Link>
        </li>
      </ul>
    </div>
  );
};

export default SelectionPage;
