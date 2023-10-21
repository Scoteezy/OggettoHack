import React, { useEffect, useState } from 'react';

import '../ModeratorPage/style.css'

import imgLogoMobile from "../../img/oggetto-flat-logo.png";
import imgLogoDesktop from "../../img/oggetto-logo_tonal-hor-rus.png";
import imgLogoDesktopBack from "../../img/oggetto-flat-logo-back-big.jpg";
import * as colors from '../../img/colors.jsx'

import Modal from '../../components/Modal';
import ModalForCreation from '../../components/ModalForCreation';
import { useSelector,useDispatch } from 'react-redux';
import { fetchAllEvents } from '../../store/meetSlice';
function ModeratorPage() {
    const dispatch = useDispatch();
    const [activeEvents, setActiveEvents] = useState(true);
    const [showAddButton, setShowAddButton] = useState(true);
    const meetings = useSelector(store => store.meet.events);
    const toggleActiveEvents = () => {
        setActiveEvents(!activeEvents);
    };
    console.log(meetings);
    useEffect(()=>{
      dispatch(fetchAllEvents())
    },[dispatch])
    const filteredMeetings = meetings.filter((meeting) => meeting.active === activeEvents);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

    const [modalId,setModalId] = useState();

    // Функция для открытия модального окна
    const openModal = (id) => {
        // setModalTitle(title);
        // setModalContent(content);
        setModalId(id);
        setIsModalOpen(true);
    };
    const openCreationModal = () =>{
      setIsCreationModalOpen(true);
    }
    const closeCreationModalOpen =()=>{
      setIsCreationModalOpen(false);

    }
    // Функция для закрытия модального окна
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return ( 
        <>
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
        
        <a style={{paddingLeft: '8%', paddingRight: '25%', paddingTop: '1%', fontSize:'36px', fontWeight: '600'}}>Редактирование событий</a>

        <div style={meetingsStyle}>
        <div>
          <a
            style={{ 
              textDecoration: activeEvents ? 'none' : 'none',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: activeEvents ? 'bold' : 'normal' }}
            onClick={toggleActiveEvents}
          >
            Активные
          </a>{' / '}
          <a
            style={{ 
              textDecoration: activeEvents ? 'none' : 'none',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: activeEvents ? 'normal' : 'bold' }}
            onClick={toggleActiveEvents}
          >
            Завершенные
          </a>
        </div>

        <div style={{ ":hover": meetingDivHoverStyle }}>
        {filteredMeetings.map((meeting) => (
            <div key={meeting.id} style={{ ...meetingDivStyle }} onClick={() => openModal(meeting.id)}>
                <a
                
                style={{
                    textDecoration: 'none',
                    fontSize: '22px',
                    cursor: 'pointer',
                }}
                
                >
                    <span style={{fontWeight:'bold'}}>{meeting.title}</span>
                
                </a><p/>
                <a style={{ fontSize: '22px' }}>{' -> '}{meeting.description}<p/>{' -> '}</a>
                <a style={{ fontSize: '22px' }}>{meeting.speaker ? meeting?.speaker?.profile?.first_name + ' ' + meeting?.speaker?.profile?.last_name : ''}</a>
                
            </div>
        ))}
        </div>

        {activeEvents && showAddButton && (
            <div style={buttonAddStyle}>
            <button onClick={()=>openCreationModal()}>Создать</button>
            </div>
        )}

            
         </div>

        

    </div>
    <ModalForCreation
    isOpen={isCreationModalOpen}
    onClose={closeCreationModalOpen}
    />
    <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={modalId}
      />
        </>
        </>
     );
}

const buttonAddStyle = {
    paddingTop: '15px',
    fontWeight: 'bold',
    cursor: 'pointer'
};

const meetingDivStyle = {
    backgroundColor: 'rgba(191, 191, 191, 0.2',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '5px',
    textDecoration: 'none',
    color: 'inherit',
    paddingTop: '10px',
    paddingDown: '10px',
    padding: '5px',
    borderRadius: '5px',
    height: 'auto'
  };
  
  const meetingDivHoverStyle = {
    backgroundColor: 'red',
  };


  const meetingsStyle = {
    backgroundColor: 'rgba(999, 999, 999, 0.5',
    width: '1100px',
    height: 'auto',
    margin: '0 auto',
    marginTop: '50px',
    borderRadius: '10px',
  };

const bodyStyle = {
    paddingTop: '2rem',
    backgroundImage: `url(${imgLogoDesktopBack})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    minHeight: '1400px',
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

export default ModeratorPage;