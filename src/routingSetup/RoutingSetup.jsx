import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AddAdminForm from '../pages/AddAdminForm';
import Profile from '../pages/Profile';
import Layout from '../layout/Layout';
import Login from '../pages/Login';
import { useAuth } from '../authProvider/AuthProvider';
import Logout from '../pages/Logout';
import AllUser from '../pages/AllUser';


export default function RoutimgSetup() {

  const { isLoggedIn } = useAuth();

    const ProtectedRoute = ({ element, isLoggedIn }) => {
      return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/"  element={<ProtectedRoute element={<Layout />} isLoggedIn={isLoggedIn} />}>
            <Route index element={<Dashboard />} />
            <Route path="contact" element={<Dashboard />} />
            <Route path="logout" element={<Logout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addnewmembar" element={<AddAdminForm />} />
            <Route path="allmember" element={<AllUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}
