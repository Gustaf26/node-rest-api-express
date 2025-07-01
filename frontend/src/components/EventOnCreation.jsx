
import { useState, useContext } from "react"

import MainContext from "../contexts/MainContext"
import CalendarContext from "../pages/Home/contexts/CalendarContext";

import { addEventToDb } from "../hooks/dbHooks";

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function EventOnCreation() {

    const [eventFriend, setEventFriend] = useState([])
    const [posibleContacts, setPosibleContacts] = useState([])
    const [contactsShowing, setContactsShowing] = useState(false)

    const { events, setEventOnCreation, contacts, userInfo, setEventCreated } = useContext(MainContext)
    const { chosenMonth, chosenDay, chosenDate } = useContext(CalendarContext)

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

    const postEvent = async (e) => {

        let atendees = eventFriend.map(friend => friend.id)
        let place = e.target[1].value
        let eventdescription = e.target[2].value
        let eventDate = chosenDate

        let msg = await addEventToDb(atendees, place, eventdescription, eventDate, userInfo.id)

        if (msg) setEventCreated(true)

        // closeModal()

    }

    return (<div className="modal" >

        <span id="close-event-on-creation" onClick={closeModal}>
            X</span>

        <form onSubmit={(e) => { e.preventDefault(); postEvent(e); e.stopPropagation(); }}>
            <div id="event-on-creation-date">
                {chosenDay && <span >Event Date: {chosenDay} of {chosenMonth}</span>}
            </div>
            <div id="event-creation-categories">
                <div>
                    <label>Atendees</label>
                    <div id="event-creation-friends-input" >
                        {eventFriend && eventFriend.map(friend => {
                            return <p style={{ backgroundColor: `rgba(18, 97, ${Math.floor(Math.random() * 255)},0.2)` }} ><img className="event-creation-friends-img" src={friend.thumbnail} />{friend.name}
                                <span onClick={() => setEventFriend((prev) => [...prev.filter(pers => pers !== friend)])
                                }>x</span></p>
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
                        <input required placeholder="Enter place"></input>
                    </div>
                </div>
                <div id="event-creation-other-events">
                    <label>Other events this day:</label>
                    <div>
                        {events.length > 0 ? events.map(event => {
                            if (event.date === chosenDate) {
                                return <p>{event.title}
                                    <span>x</span></p>
                            }
                            else return null
                        }) : <span>No events this day</span>}
                    </div>
                </div>
            </div>

            <div className="event-creation-description">
                <label>Event Description</label>
                <textarea placeholder="Write event here..."></textarea>
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
                    <Avatar sx={{ backgroundColor: 'black', height: '40px', width: '30px' }} />
                </li>)}

            </ul>

            <Button type="submit" id="new-event-button">INVITE</Button>
        </form>
    </div>)
}