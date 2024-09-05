import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import SelectionPage from './components/SelectionPage/SelectionPage';
import Dashboard from './components/Dashboard/Dashboard';
import ProductCatalogue from './components/ProductCatalogue/ProductCatalogue';
import ReportGeneration from './components/ReportGeneration/ReportGeneration';
import ShoppingSite from './components/ShoppingSite/ShoppingSite';
import PrivateRoute from './components/Firebase/PrivateRoute';
import { AuthProvider } from './components/Firebase/AuthContext'; // Import AuthProvider
import NetworkStatusBar from './components/NetworkStatusBar/NetworkStatusBar'; // Import the NetworkStatusBar component

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap your app with AuthProvider */}
        <div className="App">
          {/* Network Status Bar */}
          <NetworkStatusBar /> {/* Display the network status bar globally */}
          
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
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
