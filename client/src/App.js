// src/App.js
import React from 'react';
import './App.css';
import { Navbar, Verify, SignIn, SignUp, Home } from './components';

const App=()=> {
  return (
    <div className="App">
      <div className="gradient__bg">
      <Navbar />

    </div>
      <h1><Home/></h1>

      {/* Add other components or features as needed */}
    </div>
  )
}

export default App;
