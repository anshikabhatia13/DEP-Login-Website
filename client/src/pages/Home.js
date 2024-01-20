import React from 'react';

import ai from '.././logo1.png';
import './home.css';
import FormAction from '../components/FormAction';
const Home = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Welcome to your IIT Ropar Dashboard</h1>
      <h2>"Guide the Intellect in the Right Direction"</h2>
      <p>   <b >Indian Institute of Technology, Ropar is one of the eight new IITs set up by the Ministry of Human Resource Development (MHRD), Government of India,
         to expand the reach and enhance the quality of technical education in the country. This institute is committed to providing state-of-the-art technical education in a variety of fields and also for facilitating transmission of knowledge in keeping with latest developments in pedagogy. These two areas of focus will enable students to gain exposure to recent trends in their chosen domains of study and gain practical experience through a wide variety of activities the institute facilitates in its own campus and arranges for in collaboration with industry and other institutes. At present, the institute offers Bachelor of Technology (B. Tech.) programme in the following disciplines: Computer Science and Engineering, Electrical Engineering, and Mechanical Engineering. This programme is spread over a period of eight semesters and the institute admits forty students in each branch, selected through IIT Joint Entrance Examination conducted every year. In addition, the institute now offers doctoral programme in several disciplines.</b></p>

      
    </div>
    <div className='buttoncenter'><FormAction text="LogOut" to ="/" /></div>
  </div>
);

export default Home;