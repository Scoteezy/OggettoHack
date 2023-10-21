import React, { useState } from 'react';


import '../MainPage/style.css'

import imgLogoMobile from "../../img/oggetto-flat-logo.png";
import imgLogoDesktop from "../../img/oggetto-logo_tonal-hor-rus.png";
import imgLogoDesktopBack from "../../img/oggetto-flat-logo-back-big.jpg";
import * as colors from '../../img/colors.jsx'
import {Button} from '../../components/Button';
import { Link } from 'react-router-dom';

import * as meeting from '../../img/meet.jsx'

//TODO: сделать митинги в теле боди, добавить футер с инфой как у них
function MainPage() {
  const [activeEvents, setActiveEvents] = useState(true);
    const [showAddButton, setShowAddButton] = useState(true);

    const toggleActiveEvents = () => {
        setActiveEvents(!activeEvents);
    };

  const filteredMeetings = meeting.MEETINGS.filter((meeting) => meeting.actual === activeEvents);
    return ( 
        <>
        
        
        
        <header style={headerStyle}>
      <div style={logoStyle}>
      <picture>
            <source media="(max-width: 768px)" srcSet={imgLogoMobile} />
            <source media="(min-width: 769px)" srcSet={imgLogoDesktop} />
            <a href="/">
            <img
              src={imgLogoDesktop}
              alt="Лого"
              style={{
                height: 'auto',
                minWidth: '4rem',
                maxWidth: '14rem', 
              }}
            />
            </a>
          </picture>
      </div>
      <div >
      <Link to="/registration">
        <Button text="Регистрация" />
      </Link>
    
      </div>
    </header>

    <div style={bodyStyle}>
        <h1 style={{paddingLeft: '8%', paddingRight: '25%', paddingTop: '4%', fontSize:'66px'}}>Твоя платформа для проведения well-being мероприятий</h1>
        <a style={{paddingLeft: '8%', paddingRight: '25%', paddingTop: '1%', fontSize:'26px'}}>#oggettowellbeing</a>

        <div style={meetingsStyle}>
          <div style={{backgroundColor: 'rgba(999, 999, 999, 0.5', width: '1090px', fontSize: '26px', fontWeight:'bold', paddingLeft: '10px', paddingTop: '10px', borderRadius: '10px'}}>Актуальные встречи</div>
        {filteredMeetings.map((meeting) => (
            <div key={meeting.id} style={{ ...meetingDivStyle }}>
                <a
                
                style={{
                    textDecoration: 'none',
                    fontSize: '22px',
                    cursor: 'pointer',
                }}
                >
                    <span style={{fontWeight:'bold'}}>{meeting.name}</span>
                
                </a><p/>
                <a style={{ fontSize: '22px' }}>{' -> '}{meeting.topic}<p/>{' -> '}</a>
                <a style={{ fontSize: '22px' }}>{meeting.date} <p/> {' -> '} {meeting.author}</a>
            </div>
        ))}
              
              
        </div>
    </div>
        </>
     );
}

const meetingDivStyle = {
  backgroundColor: 'rgba(999, 999, 999, 0.5',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginTop: '5px',
  textDecoration: 'none',
  color: 'inherit',
  paddingTop: '10px',
  paddingDown: '10px',
  padding: '5px',
  borderRadius: '5px'
};

const meetingsStyle = {
    backgroundColor: 'rgba(999, 999, 999, 0.5',
    width: '1100px',
    height: 'auto',
    margin: '0 auto',
    marginTop: '50px',
    borderRadius: '10px',
    paddingTop: '2rem'
  };

const bodyStyle = {
  paddingTop: '2rem',
  backgroundImage: `url(${imgLogoDesktopBack})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'repeat',
  minHeight: '1600px',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    color: '#fff',
    marginLeft: '8%',
    marginRight: '8%',

  };
  
  const logoStyle = {
    flex: 1, 
    
  };
  
  

export default MainPage;