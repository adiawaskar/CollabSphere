import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import DocumentRepository from './pages/DocumentRepository';
import Editor from './pages/Editor';
import Dashboard from './pages/Dashboard';
import VideoConference from './components/VideoConference';

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
          <Route path="/documents" element={<DocumentRepository/>} />
          <Route path="/edit/:docId" element={<Editor />} />
          <Route path="/view/:docId" element={<Editor isReadOnly />} />
          <Route path="/video-conference/:sessionId" element={<VideoConference />} />
        </Routes>
        <ToastContainer/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;