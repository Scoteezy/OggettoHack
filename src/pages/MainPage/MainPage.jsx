import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../MainPage/style.css';
import imgLogoMobile from "../../img/oggetto-flat-logo.png";
import imgLogoDesktop from "../../img/oggetto-logo_tonal-hor-rus.png";
import imgLogoDesktopBack from "../../img/oggetto-flat-logo-back-big.jpg";
import * as colors from '../../img/colors.jsx';
import { Button } from '../../components/Button';
import { fetchAllEvents } from '../../store/meetSlice';
import { useSelector, useDispatch } from 'react-redux';

function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const [activeEvents, setActiveEvents] = useState(true);
  const meetings = useSelector(store => store.meet.events);
  const toggleActiveEvents = () => {
    setActiveEvents(!activeEvents);
  };

  const filteredMeetings = meetings.filter(meeting => meeting.active === activeEvents);

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
        <div>
          <Link to="/registration">
            <Button text="Регистрация" />
          </Link>
        </div>
      </header>

      <div style={bodyStyle}>
        <h1 style={{ paddingLeft: '8%', paddingRight: '25%', paddingTop: '4%', fontSize: '66px' }}>
          Твоя платформа для проведения well-being мероприятий
        </h1>
        <a style={{ paddingLeft: '8%', paddingRight: '25%', paddingTop: '1%', fontSize: '26px' }}>
          #oggettowellbeing
        </a>

        <div style={centerContent}>
          <div style={meetingsStyle}>
            <div
              style={{
<<<<<<< HEAD
                backgroundColor: 'rgba(235, 235, 235, 0)',
=======
                backgroundColor: 'rgba(235, 235, 235, 0.2)',
>>>>>>> 156c9caa1bf56cd336cd81b6e2be03eb23a4b3a1
                fontSize: '26px',
                fontWeight: 'bold',
                paddingLeft: '10px',
                paddingTop: '10px',
                borderRadius: '10px',
              }}
            >
              Актуальные встречи
            </div>
            <div style={meetingContainerStyle}>
              {filteredMeetings.map(meeting => (
                <Link to={`/meetup/${meeting.id}`} key={meeting.id} style={meetingCardStyle}>
                  <span style={{ fontWeight: 'bold', fontSize: '24px' }}>{meeting.title}</span>
                  <p />
                  <span style={{ fontSize: '22px' }}>{' -> '}{meeting.description}</span>
                  <p />
                  <span style={{ fontSize: '22px' }}>
                    {meeting.speaker ? `${meeting.speaker?.profile?.first_name} ${meeting.speaker?.profile?.last_name}` : ''}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

<<<<<<< HEAD
=======
const buttonCreate = {
  borderRadius: '2rem',
  backgroundColor: colors.YELLOW,
  border: 'none',
  height: '2.4rem',
  width: '7rem',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: '600',
  fontSize: '1.2rem',
  paddingRight: '-1rem',
  cursor: 'pointer',
  outline: 'none',
};

const buttonAddStyle = {
  paddingTop: '15px',
  fontWeight: 'bold',
  cursor: 'pointer'
};
>>>>>>> 156c9caa1bf56cd336cd81b6e2be03eb23a4b3a1

const meetingCardStyle = {
  textDecoration: 'none',
  color: 'inherit',
<<<<<<< HEAD
  backgroundColor: 'rgba(245, 245, 245, 0.4)',
=======
  backgroundColor: 'white',
>>>>>>> 156c9caa1bf56cd336cd81b6e2be03eb23a4b3a1
  border: '1px solid #e1e1e1',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  padding: '20px',
  flex: '0 0 calc(25% - 20px)',
  boxSizing: 'border-box',
  margin: '10px',
};

const meetingContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '1000px',
  
};

const meetingsStyle = {
<<<<<<< HEAD
  backgroundColor: 'rgba(245, 245, 245, 0.4)',
=======
  backgroundColor: 'rgba(235, 235, 235, 0.2)',
>>>>>>> 156c9caa1bf56cd336cd81b6e2be03eb23a4b3a1
  padding: '20px',
  borderRadius: '10px',
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

const centerContent = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1rem',

};

export default MainPage;
