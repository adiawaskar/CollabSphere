import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
        <Routes>
            <Route path="/" element={<Landing/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;