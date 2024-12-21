import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;