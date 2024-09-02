import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import ShoppingSite from './components/ShoppingSite/ShoppingSite';
import SelectionPage from './components/SelectionPage/SelectionPage'; 
import Dashboard from './components/Dashboard/Dashboard';
import ProductCatalogue from './components/ProductCatalogue/ProductCatalogue';
import ReportGeneration from './components/ReportGeneration/ReportGeneration';
import HeaderBar from './components/HeaderBar/HeaderBar';

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/selection" element={<SelectionPage />} /> 
            <Route path="/shopping" element={<ShoppingSite />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product-catalogue" element={<ProductCatalogue />} />
            <Route path="/report-generation" element={<ReportGeneration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
