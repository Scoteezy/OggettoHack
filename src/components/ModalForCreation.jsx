import { useState    } from 'react';
import '../../src/components/modal.css'
import { useDispatch } from 'react-redux';
import { addNewEvent } from '../store/meetSlice';
function ModalForCreation({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [eventName,setEventName]=useState('');
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
            <h3>Создать ивент</h3>
          <input type="text" onChange={(e)=>setEventName(e.target.value)} value={eventName} />
          <button onClick={onClose} className="close-button">
            Закрыть
          </button>
        </div>
        <button onClick={()=>dispatch(addNewEvent(eventName))}>Создать</button>
      </div>
    </div>
  );
}

export default ModalForCreation;
