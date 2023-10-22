import { useState    } from 'react';
import '../../src/components/modal.css'
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../store/meetSlice';
import {useSelector} from 'react-redux';

function ModalForDelete({ isOpen, onClose, id }) {
  const dispatch = useDispatch();
  const allEvents = useSelector(store => store.meet.events);
  const event = allEvents.find((event) => event.id == id);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
      <button onClick={onClose} className="close-button">
                Закрыть
            </button>
        <div className="modal-header">
            <h3>Удалить ивент?</h3>
          
            
        </div>
        <button onClick={()=>{
          dispatch(deleteEvent(event))
          onClose()
        }} style={buttonCreateeStyle}>Удалить</button>
      </div>
    </div>
  );
}



const buttonCreateeStyle = {
  borderRadius: '2rem',
    backgroundColor: '#ff3403',
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

export default ModalForDelete;
