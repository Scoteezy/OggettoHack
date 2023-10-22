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
        <div className="modal-header">
            <h3>Удалить ивент</h3>
          
            <button onClick={onClose} className="close-button">
                Закрыть
            </button>
        </div>
        <button onClick={()=>{
          dispatch(deleteEvent(event))
          onClose()
        }}>Удалить</button>
      </div>
    </div>
  );
}

export default ModalForDelete;
