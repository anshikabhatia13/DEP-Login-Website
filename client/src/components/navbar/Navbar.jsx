import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../../logo1.png';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="https://www.iitrpr.ac.in/">IIT Ropar</a></p>
          <p><a href="https://www.iitrpr.ac.in/">Mobile App</a></p>
          
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        {/* <p>Sign in</p>
        <button type="button">Sign up</button> */}
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <Link to="/">Home</Link>
              <a href="https://www.iitrpr.ac.in/" target="_blank" rel="noopener noreferrer">IIT Ropar</a>
              <Link to="/mobile-app">Mobile App</Link>
            </div>
            <div className="gpt3__navbar-menu_container-links-sign">
              <p>Sign in</p>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
