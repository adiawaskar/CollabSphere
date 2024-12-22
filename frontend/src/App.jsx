import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <ToastContainer />
    <Navbar/>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/dashboard/:projectName" element={<Dashboard/>} />
        </Routes>
      <Navbar/>
        <ToastContainer/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;