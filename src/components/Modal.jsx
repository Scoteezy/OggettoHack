import {useState, useEffect} from 'react';
import '../../src/components/modal.css';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {changeEvent} from '../store/meetSlice';

function Modal({isOpen, onClose, id}) {
    const dispatch = useDispatch();
    const allEvents = useSelector(store => store.meet.events);
    const event = allEvents.find((event) => event.id == id);
    const [changable, setChangable] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventTopic, setEventTopic] = useState('');
    const [eventStatus, setEventStatus] = useState('');
    const [speakers, setSpeakers] = useState([]);
    const [speakerId, setSpeakerId] = useState('');

    const fetchSpeakers = async () => {
        try {
            const response = await fetch(`/api/speakers`, {
<<<<<<< HEAD
                method: 'GET',
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            return Array.from(data.data.speakers);

        } 
        catch (error) {
=======
                headers: {
                    'access': localStorage.getItem('AccessToken')
                },body: JSON.stringify({id: speakerId})
            });
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            return Array.from(data.data.speakers);
        } catch (error) {
>>>>>>> 156c9caa1bf56cd336cd81b6e2be03eb23a4b3a1
            console.log(error);
        }
    }

    const changeSpeaker = async () => {
        try {
<<<<<<< HEAD
            const response = await fetch(`/api/meetup/${id}/assign`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                credentials: "include",
                body: JSON.stringify({
                    id: speakerId
                })
            });

            if (!response.ok) {
                throw new Error('Server Error!');
            }
        } 
        catch (e) {
=======
            console.log("id is " + speakerId, id);
            const response = await fetch(`/api/meetup/${id}/assign`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'access': localStorage.getItem('AccessToken')
                },
                body: JSON.stringify({id: speakerId})
            });
            if (!response.ok) {
                throw new Error('Server Error!');
            }
        } catch (e) {
>>>>>>> 156c9caa1bf56cd336cd81b6e2be03eb23a4b3a1
            console.log(e);
        }
    }

    useEffect(() => {
        if (id && event) {
          if (id && event) {
            const updatedEvent = { ...event }; // Создать копию объекта event
            updatedEvent.active = 1; // Изменить свойство в копии
            setEventName(updatedEvent.title);
            setEventTopic(updatedEvent.description);
            setEventStatus(updatedEvent.active);
            setChangable(true);
          }
            setEventName(event.title);
            setEventTopic(event.description);
            setEventStatus(event.active);
            setChangable(true);
        }
    }, [event, id]);

    useEffect(() => {
        fetchSpeakers().then((speak) => {
            setSpeakers(speak);
        });
    }, [id]);

    const handleSelectChange = (e) => {
        setEventStatus(!!e.target.value);
    }

    if (!isOpen) {
        return null;
    }

    const changeOrAdd = () => {
        if (event) {
            const newEvent = {
                ...event
            }; // Use object spread to create a copy
            newEvent.title = eventName;
            newEvent.description = eventTopic;
            newEvent.active = eventStatus;

            if (changable) {
                console.log(newEvent);
                if (speakerId) {
                    console.log(speakerId);
                    changeSpeaker();
                }
                dispatch(changeEvent(newEvent));
            }
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <input
                        type="text"
                        onChange={(e) => setEventName(e.target.value)}
                        value={eventName}/>
                    <button onClick={onClose} className="close-button">
                        Закрыть
                    </button>
                </div>
                <div className="modal-content">
                    <input
                        type="text"
                        onChange={(e) => setEventTopic(e.target.value)}
                        value={eventTopic}/>
                    <select defaultValue='value1' onChange={(e) => setSpeakerId(e.target.value)}>
                        <option disabled="disabled" value="value1">Выбор ментора</option>
                        {
                            speakers && speakers.length > 0 && speakers.map(
                                speaker => <option key={speaker.id} value={speaker.id}>
                                    {
                                        speaker
                                            ?.profile
                                                ?.first_name + ' ' + speaker
                                                    ?.profile
                                                        ?.last_name
                                    }
                                </option>
                            )
                        }
                    </select>
                    <select defaultValue='choice' onChange={handleSelectChange}>
                        <option disabled="disabled" value="choice">Выбор статуса</option>
                        <option value="true">Активно</option>
                        <option value="">Завершено</option>
                    </select>
                    <div className='modal-members'>
                        <h3>Участники</h3>
                        {
                            event.guests && event
                                .guests
                                .map((guest) => (
                                    <div key={guest.id}>
                                        <p>{guest.profile.first_name + " " + guest.profile.last_name}</p>
                                    </div>
                                ))
                        }

                        <button onClick={changeOrAdd}>Добавить/Изменить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
