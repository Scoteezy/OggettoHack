import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams from React Router
import '../MainPage/style.css';
import imgLogoMobile from "../../img/oggetto-flat-logo.png";
import imgLogoDesktop from "../../img/oggetto-logo_tonal-hor-rus.png";
import imgLogoDesktopBack from "../../img/oggetto-flat-logo-back-big.jpg";
import * as colors from '../../img/colors.jsx';

import { fetchAllEvents, signupEvent } from '../../store/meetSlice';
import { useSelector, useDispatch } from 'react-redux';

function UserPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const [activeEvents, setActiveEvents] = useState(true);
  const meetings = useSelector(store => store.meet.events);
  const toggleActiveEvents = () => {
    setActiveEvents(!activeEvents);
  };

  // Use useParams to get the "id" parameter from the URL
  const { id } = useParams();

  // Filter the meetings to find the one with the matching ID
  const selectedMeeting = meetings.find(meeting => meeting.id === id);

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
      </header>

      <div style={bodyStyle}>
        <div style={centerContent}>
          <div style={meetingsStyle}>
            {selectedMeeting && (
              <div>
                <div
                  style={{
                    backgroundColor: 'rgba(235, 235, 235, 0.2)',
                    fontSize: '26px',
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    borderRadius: '10px',
                  }}
                >
                  Актуальное мероприятие
                </div>
                <div style={meetingContainerStyle}>
                  <div style={meetingCardStyle}>
                    <span style={{ fontWeight: 'bold', fontSize: '24px' }}>{selectedMeeting.title}</span>
                    <p />
                    <span style={{ fontSize: '22px' }}>{' -> '}{selectedMeeting.description}</span>
                    <p />
                    <p />
                    <span style={{ fontSize: '22px' }}>
                      {selectedMeeting.speaker
                        ? `${selectedMeeting.speaker?.profile?.first_name} ${selectedMeeting.speaker?.profile?.last_name}`
                        : ''}
                    </span><p/>
                    <button  style={buttonCreate} onClick={()=>dispatch(signupEvent(selectedMeeting))}>Записаться</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const buttonCreate = {
    borderRadius: '2rem',
    backgroundColor: colors.YELLOW,
    border: 'none',
    height: '2.4rem',
    width: '10rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
    fontSize: '1.2rem',
    paddingRight: '-1rem',
    cursor: 'pointer',
    outline: 'none',
    marginTop: '3rem'
  };

const meetingCardStyle = {
  textDecoration: 'none',
  color: 'inherit',
  backgroundColor: 'rgba(245, 245, 245, 0.4)',
  border: '1px solid #e1e1e1',
  borderRadius: '8px',
  boxSizing: 'border-box',
  margin: '10px',
  padding: '1rem',
  width: '1000px'
};

const meetingContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '1000px',
  
};

const meetingsStyle = {
  backgroundColor: 'rgba(245, 245, 245, 0.4)',
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

export default UserPage;
