import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import SelectionPage from './components/SelectionPage/SelectionPage';
import Dashboard from './components/Dashboard/Dashboard';
import ProductCatalogue from './components/ProductCatalogue/ProductCatalogue';
import ReportGeneration from './components/ReportGeneration/ReportGeneration';
import ShoppingSite from './components/ShoppingSite/ShoppingSite';
import Sales from './components/Sales/Sales'; // New Sales component import
import PrivateRoute from './components/Firebase/PrivateRoute';
import { AuthProvider } from './components/Firebase/AuthContext';
import NetworkStatusBar from './components/NetworkStatusBar/NetworkStatusBar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <NetworkStatusBar />

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/selection"
              element={
                <PrivateRoute>
                  <SelectionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/product-catalogue"
              element={
                <PrivateRoute>
                  <ProductCatalogue />
                </PrivateRoute>
              }
            />
            <Route
              path="/report-generation"
              element={
                <PrivateRoute>
                  <ReportGeneration />
                </PrivateRoute>
              }
            />
            <Route
              path="/shopping"
              element={
                <PrivateRoute>
                  <ShoppingSite />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <PrivateRoute>
                  <Sales />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
