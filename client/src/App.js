import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Navbar from './components/Navbar';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <>
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/tasks"
          element={
            <>
              <ProtectedRoute>
                <Navbar />
                <Tasks />
              </ProtectedRoute>
            </>
          }
        />
        <Route path='/admin'
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>}
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
