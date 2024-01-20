// src/App.js
import React from 'react';
// import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import VerifyPage from './pages/Verify';
import HomePage from './pages/Home';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
      </div>

      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          <Routes>
            {/* <Switch> */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/home" element={<HomePage />} />
            {/* </Switch> */}
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
