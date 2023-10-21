import { API_URL } from '../services';
import { useState,useEffect } from 'react';
import '../../src/components/modal.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {changeEvent} from '../store/meetSlice';
function Modal({ isOpen, onClose, id }) {
  const dispatch = useDispatch();
  const allEvents = useSelector(store=>store.meet.events);
  const event = allEvents.find((event)=>event.id==id);
  const [changble, setChangble] = useState(false);
  const [eventName,setEventName]=useState('');
  const [eventTopic,setEventTopic] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [speakers, setSpeakers] = useState([]);
  const [speakerId, setSpeakerId] = useState('');
  // const [eventMembers, setEventMembers] = useState([]);
  const fetchSpeakers = async() =>{
    try{
      const response = await fetch(`${API_URL}/speakers`,{
          headers:{
              'access': localStorage.getItem('AccessToken')
          }
      });
      if(!response.ok){
      throw new Error('Server Error!');
      }
      const data = await response.json();
      // console.log(data.data.speakers);
      return Array.from(data.data.speakers);
  }
  catch(error){
      console.log(error);
  }
  }
  const changeSpeaker = async()=>{
    try{
      console.log("id is " + speakerId, id)
      console.log(JSON.stringify({id: speakerId}))
      const response = await fetch (`${API_URL}/meetup/${id}/assign`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          'access': localStorage.getItem('AccessToken')
        },
        body: JSON.stringify({id: speakerId})
      })
      if(!response.ok){
        throw new Error('Server Error!');
        }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    if(id){
      setEventName(event.title);
      setEventTopic(event.description);
      setEventStatus(event.active);
      setChangble(true);
    }
  },[id])
  useEffect(()=>{
    fetchSpeakers().then((speak) => {
      setSpeakers(speak);
      console.log(speakers);
    });
  },[id])
  const handleSelectChange=(e)=>{
    setEventStatus(!!e.target.value)
  }
  if (!isOpen) {
    return null;
  }
  const changeOrAdd = ()=>{
    const newEvent = structuredClone(event)
    newEvent.title=eventName;
    newEvent.description = eventTopic;
    newEvent.active=eventStatus;
    if(changble){
      console.log(newEvent);
      if(speakerId){
        console.log(speakerId)
        changeSpeaker();
      }
      dispatch(changeEvent(newEvent));
      
    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <input type="text" onChange={(e)=>setEventName(e.target.value)} value={eventName} />
          <button onClick={onClose} className="close-button">
            Закрыть
          </button>
        </div>
        <div className="modal-content">
          <input type="text" onChange={(e)=>setEventTopic(e.target.value)} value={eventTopic} />
          <select defaultValue='value1' onChange={(e)=>setSpeakerId(e.target.value)}>
            <option disabled value="value1">Выбор ментора</option>
            {speakers.map(speaker=>
            <option key={speaker.id} value={speaker.id}>
                {speaker?.profile?.first_name + ' ' + speaker?.profile?.last_name}
            </option>
            )}
            </select>
          <select defaultValue='choice' onChange={handleSelectChange}>
            <option disabled  value="choice">Выбор статуса</option>
            <option value="true">Активно</option>
            <option value="">Завершено</option>
          </select>
          <div className='modal-members'>
            <h3>Участники</h3>
            {event.guests.map((guest)=> <div key= {guest.id}><p>{guest.profile.first_name + " " + guest.profile.last_name}</p></div>)}
            <button onClick={changeOrAdd}>Добавить/Изменить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
