import React from 'react';

// import ai from '../../assets/ai.jpg';
import './home.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
       <h1 className="gradient__text">Welcome to your IIT Ropar Dashboard</h1>
      <h2>Here are your credentials</h2>
      {/* <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div> */}

      {/* <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div> */}
    </div>

    {/* <div className="gpt3__header-image"> */}
      {/* <img src={ai} /> */}
      
    {/* </div> */}
  </div>
);

export default Header;