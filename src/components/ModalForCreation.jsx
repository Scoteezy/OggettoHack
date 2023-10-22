import { useState    } from 'react';
import '../../src/components/modal.css'
import { useDispatch } from 'react-redux';
import { addNewEvent } from '../store/meetSlice';
function ModalForCreation({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [eventName,setEventName]=useState('имя');
  const [eventDescription,setEventDescription]=useState('описание');
  const [eventGuests,setEventGuests]=useState([]);
  const [eventSpeakers,setEventSpeakers]=useState('спикер');
  const [eventSpeakerId,setEventSpeakerId]=useState('1');
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
            <h3>Создать ивент</h3>
          <input type="text" onChange={(e)=>setEventName(e.target.value)} value={eventName} />
          <input type="text" onChange={(e)=>setEventDescription(e.target.value)} value={eventDescription} />
          <input type="text" onChange={(e)=>setEventGuests(e.target.value)} value={eventGuests} />
          <input type="text" onChange={(e)=>setEventSpeakers(e.target.value)} value={eventSpeakers} />
          <input type="text" onChange={(e)=>setEventSpeakerId(e.target.value)} value={eventSpeakerId} />
          
          
          <button onClick={onClose} className="close-button">
            Закрыть
          </button>
        </div>
<<<<<<< HEAD
        <button onClick={()=>{
          dispatch(addNewEvent(eventName, eventDescription, eventGuests, eventSpeakers, eventSpeakerId ))
          onClose()
        }}>Создать</button>
=======
        <button onClick={()=>dispatch(addNewEvent(eventName, eventDescription, eventGuests, eventSpeakers, eventSpeakerId ))}>Создать</button>
>>>>>>> 156c9caa1bf56cd336cd81b6e2be03eb23a4b3a1
      </div>
    </div>
  );
}

export default ModalForCreation;
