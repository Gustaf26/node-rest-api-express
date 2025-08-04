
import { useState, useContext, useEffect } from "react"

import MainContext from "../contexts/MainContext"
import CalendarContext from "../pages/Home/contexts/CalendarContext";

import { addEventToDb, deleteEventFromDb, updateEventInDb } from "../hooks/dbHooks";

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export default function EventOnCreation({ eventOnCreation }) {

    const [eventFriend, setEventFriend] = useState([])
    const [posibleContacts, setPosibleContacts] = useState([])
    const [contactsShowing, setContactsShowing] = useState(false)
    const [standardDate, setStandardDate] = useState(null)

    const { events, setEventOnCreation, contacts, userInfo, setEvents, setEventCreated } = useContext(MainContext)
    const { chosenDate, setChosenDate } = useContext(CalendarContext)

    // Set the event atendees in the UI
    useEffect(() => {

        if (eventOnCreation.persons) {

            let dummyFriends = []
            eventOnCreation.persons.forEach(person => {
                contacts.forEach(contact => {
                    if (contact.id === person) dummyFriends.push(contact)
                })
            })
            setEventFriend(dummyFriends)
        }

    }, [eventOnCreation])

    // This function shows possible matches with contacts when typing in atendees input
    const showPossibleContacts = (e) => {

        let dummyContacts = []

        if (e.target.value === "") { setPosibleContacts(dummyContacts); return }

        let filteredFriends = contacts.filter(friend => friend.name.toLowerCase().includes(e.target.value))

        if (filteredFriends.length === 0) {
            contacts.forEach(contact => {
                if (contact.name.toLowerCase().includes(e.target.value.toLowerCase()) && !dummyContacts.includes(contact)) {
                    dummyContacts.push(contact)
                }
            })
        }

        setPosibleContacts(dummyContacts)
    }

    const addFriendToEvent = (contact) => {

        // Close the possible contacts showing
        setPosibleContacts([]);
        // And add a friend to event
        setEventFriend((prev) => !prev.includes(contact) ? [...prev, contact] :
            [...prev])
    }

    const closeModal = () => {
        setEventFriend([]);
        setEventOnCreation(false)
    }

    const handleSubmit = async (e, action) => {

        let atendees = eventFriend.map(friend => friend.id)
        let place = e.target[1].value
        let eventdescription = e.target[2].value
        let eventDate = chosenDate

        let msg = action === 'update' ? await updateEventInDb(atendees, place, eventdescription, eventDate, eventOnCreation.id, userInfo.id) :
            await addEventToDb(atendees, place, eventdescription, eventDate, userInfo.id)

        if (msg) console.log(msg); setEventCreated(true)

        closeModal()

    }

    const deleteEvent = async (eventToDelete) => {

        let response = await deleteEventFromDb(eventToDelete, userInfo.id)

        if (response.msg) {
            let allEvents = events.filter(ev => ev.id !== eventToDelete.id)
            setEvents(allEvents)
            alert(response.msg)
            closeModal()
        }
        else if (response.error) { alert('No such event') }
        else alert('Something wrong now, try again later')
    }

    const formatDate = value => {

        let formattedDate = value[5] === '0' ? value.slice(0, 5) + value.slice(6, 10)
            : value

        let secondDash = formattedDate.lastIndexOf('-')

        formattedDate = formattedDate[secondDash + 1] === '0' ? formattedDate.slice(0, secondDash + 1) + formattedDate.slice(secondDash + 2, formattedDate.length)
            : formattedDate

        setChosenDate(formattedDate)

    }

    useEffect(() => {
        let chosen = chosenDate
        if (chosen.length === 9) {
            chosen = chosen.split('')
            chosen.splice(5, 0, '0')
            chosen = chosen.join('')
        }
        setStandardDate(chosen)
    }, [])


    return (<div className="modal" >

        <span id="close-event-on-creation" onClick={closeModal}>
            X</span>

        <form id="event-on-creation-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(e, eventOnCreation.title ? 'update' : 'create'); e.stopPropagation(); }}>
            <div id="event-on-creation-date">
                {eventOnCreation.title ? <input defaultValue={standardDate} onChange={(e) => formatDate(e.target.value)} type="date" id="new-event-input" name="event-input" /> :
                    <span >Event Date: {eventOnCreation.date}</span>}
            </div>
            <div id="event-creation-categories">
                <div>
                    <label>Atendees</label>
                    <div id="event-creation-friends-input" >
                        {eventFriend && eventFriend.map(friend => {
                            return <p style={{ backgroundColor: `rgba(18, 97, 153,${Math.random() * 5}` }} >
                                <img className="event-creation-friends-img" src={friend.thumbnail} />
                                {friend.name}
                                <span onClick={() => setEventFriend((prev) => [...prev.filter(pers => pers !== friend)])
                                }>
                                    <DeleteForeverIcon color='warning' />
                                </span>
                            </p>
                        })}
                        <input placeholder="Search for friend..." onChange={(e) => { showPossibleContacts(e) }}></input>

                        <ul id="event-creation-friends-autocomplete">
                            {posibleContacts && posibleContacts.map(contact => {
                                return (<li onClick={() => {
                                    addFriendToEvent(contact)
                                }}>{contact.name}<img src={contact.thumbnail} /></li>)
                            })}
                        </ul>
                    </div>
                    <label>Place</label>
                    <div id="event-creation-place">
                        <input required placeholder="Enter place" defaultValue={eventOnCreation.place ?? ''} />
                    </div>
                </div>
                <div id="event-creation-other-events">
                    <label>Other events this day</label>
                    <div id="event-creation-other-events-area">
                        {events.length > 0 ? events.map(event => {
                            if (event.date === eventOnCreation.date && event.id !== eventOnCreation.id) {
                                return <p style={{ backgroundColor: `rgba(18, 97, 153,${Math.random() * 5}` }}>
                                    {event.title}
                                    <span>
                                        <DeleteForeverIcon onClick={() => deleteEvent(event)} color='warning' />
                                        <EditIcon onClick={() => updateEvent(event)} color="info" />
                                    </span>
                                </p>
                            }
                            else return null
                        }) : <span>No events this day</span>}
                    </div>
                </div>
            </div>

            <div className="event-creation-description">
                <label>Event Description</label>
                <textarea placeholder="Write event here...">{eventOnCreation.title ?? ''}</textarea>
            </div>

            <ul className={!contactsShowing ? "event-contacts-thumbnails" : "event-contacts-thumbnails animated"}
                onMouseOut={() => setContactsShowing(false)}
                onMouseOver={() => setContactsShowing(true)}>

                {contactsShowing ? contacts.map((contact, i) => {
                    return (<li className="animated">
                        <img onClick={() => { addFriendToEvent(contact) }} style={{ top: `${((i + 1) * 100) + 120}px` }}
                            alt="contact-picture" className="on-creation-contact-thumbnail" src={contact.thumbnail} />
                    </li>)
                }) : (<li className="dummy-avatar">
                    <Avatar sx={{ backgroundColor: 'rgba(0,0,0,0.2)', height: '40px', width: '40px' }} />
                </li>)}

            </ul>

            <div id="action-buttons-update-box">
                <Button type="submit">{eventOnCreation.title ? 'UPDATE' : 'INVITE'}</Button>
                {eventOnCreation.title ? <DeleteForeverIcon sx={{ width: '50px', fontSize: 'xx-large' }}
                    onClick={() => deleteEvent(eventOnCreation)} color='warning' /> : null}
            </div>

        </form>
    </div>)
}