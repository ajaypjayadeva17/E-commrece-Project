import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './home/Homepage';
import LoginPage from './auth/LoginPage';
import SignupPage from './auth/SignupPage';
import AdminDashboard from './dashboard/AdminDashboard';
import VendorDashboard from './dashboard/VendorDashboard';
import CustomerDashboard from './dashboard/CustomerDashboard';
import PrivateRoute from './auth/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin-dashboard" element={<PrivateRoute role="ADMIN" Component={AdminDashboard} />} />
        <Route path="/vendor-dashboard" element={<PrivateRoute role="VENDOR" Component={VendorDashboard} />} />
        <Route path="/customer-dashboard" element={<PrivateRoute role="CUSTOMER" Component={CustomerDashboard} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
