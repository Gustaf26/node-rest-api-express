
import { useState, useContext } from "react"

import MainContext from "../../../contexts/MainContext"

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const thisMonth = new Date().getMonth()

export default function EventOnCreation(props) {

    const [eventFriend, setEventFriend] = useState([])
    const [posibleContacts, setPosibleContacts] = useState([])
    const [contactsShowing, setContactsShowing] = useState(false)

    const { chosenDate, chosenMonth, chosenDay, events, setEventOnCreation, contacts, actualMonth } = useContext(MainContext)

    const { setEventElement, dayDate, dayNr, thisDay, day } = props

    let daysBase = [0, 7, 14, 21, 28]

    let weekDays = [daysBase,
        daysBase.map(day => day + 1),
        daysBase.map(day => day + 2),
        daysBase.map(day => day + 3),
        daysBase.map(day => day + 4),
        daysBase.map(day => day + 5),
        daysBase.map(day => day + 6)
    ]

    let dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


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

    return (<div>

        <span id="close-event-on-creation" onClick={() => {
            setEventElement([]);
            setEventFriend([]);
            setEventOnCreation(false)
        }}>
            X</span>

        <form onClick={(e) => e.stopPropagation()}>
            <div id="event-on-creation-date">
                {/* <span className={dayNr === thisDay && thisMonth === actualMonth ?
                    "month-cal-day-nr today" : "month-cal-day-nr"}>Event Date: {weekDays.map((days, i) => { return days.includes(dayNr) ? dayNames[i] : null })}
                    {" "}{dayNr} of {chosenMonth}
                </span> */}
                {chosenDay && <span >Event Date: {weekDays.map((days, i) => { return days.includes(chosenDay) ? dayNames[i] : null })}
                </span>}
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
                                    setPosibleContacts([]);
                                    setEventFriend((prev) => !prev.includes(contact) ? [...prev, contact] :
                                        [...prev])
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
                        {events ? events.map(event => {

                            if (event.date === dayDate) {
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
            <ul className={!contactsShowing ? "event-contacts-thumbnails" : "event-contacts-thumbnails animated"} onMouseOut={() => setContactsShowing(false)}
                onMouseOver={() => setContactsShowing(true)}>
                {contactsShowing ? contacts.map((contact, i) => {
                    return (<li className="animated">
                        <img onClick={() => {
                            setPosibleContacts([]);
                            setEventFriend((prev) => !prev.includes(contact) ? [...prev, contact] :
                                [...prev])
                        }} style={{ top: `${((i + 1) * 100) + 120}px` }}
                            alt="contact-picture" className="on-creation-contact-thumbnail" src={contact.thumbnail} />
                    </li>)
                }) : (<li className="dummy-avatar"><Avatar sx={{ backgroundColor: 'black', height: '40px', width: '30px' }} /></li>)}
            </ul>

            <Button onClick={() => setEventOnCreation(false)} id="new-event-button">INVITE</Button>
        </form>
    </div>)
}