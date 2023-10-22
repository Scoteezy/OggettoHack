import { useState    } from 'react';
import '../../src/components/modal.css'
import { useDispatch } from 'react-redux';
import { addNewEvent } from '../store/meetSlice';

import * as colors from  '../img/colors.jsx'

function ModalForCreation({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [eventName,setEventName]=useState('Название');
  const [eventDescription,setEventDescription]=useState('Описание');
  const [eventGuests,setEventGuests]=useState([]);
  const [eventSpeakers,setEventSpeakers]=useState('спикер');
  const [eventSpeakerId,setEventSpeakerId]=useState('1');
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay">
      
      <div className="modal">
      <button onClick={onClose} className="close-button">
            Закрыть
          </button>
      <h3>Создать ивент</h3>
      
     
        <div className="modal-header">
        
            
            <p>
              <div>
                <input type="text" onChange={(e)=>setEventName(e.target.value)} value={eventName} style={inputCreateStyle}/>
              </div>
              <div>
                <input type="text" onChange={(e)=>setEventDescription(e.target.value)} value={eventDescription} style={inputCreateStyle}/>
              </div>
              <div>
              <button style={buttonAddFile}>Прикрепить файл</button>
              </div>
            </p>

          
        </div>
        <button onClick={()=>{
          dispatch(addNewEvent(eventName, eventDescription, eventGuests, eventSpeakers, eventSpeakerId ))
          onClose()
        }} style={buttonCreateeStyle}>Создать</button>
      </div>
    </div>
  );
}

const buttonAddFile = {
  borderRadius: '2rem',
    backgroundColor: 'lightgrey',
    border: 'none',
    height: '1.8rem',
    width: '12rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '300',
    fontSize: '1rem',
    paddingRight: '-1rem',
    cursor: 'pointer',
    outline: 'none',
    marginTop: '0.3rem',
};

const inputCreateStyle = {
  color: 'lightgrey',
  border: '1px solid grey',
  borderRadius: '5px',
  marginTop: '1rem'
};

const buttonCreateeStyle = {
  borderRadius: '2rem',
    backgroundColor: 'lightgreen',
    border: 'none',
    height: '2.3rem',
    width: '7rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
    fontSize: '1.2rem',
    paddingRight: '-1rem',
    cursor: 'pointer',
    outline: 'none',
    marginTop: '0.3rem'
};

export default ModalForCreation;
