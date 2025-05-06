
import { useState, useContext } from "react"

import MainContext from "../../../contexts/MainContext"

import Button from '@mui/material/Button';

const thisMonth = new Date().getMonth()

export default function EventOnCreation(props) {

    const [eventFriend, setEventFriend] = useState([])
    const [posibleContacts, setPosibleContacts] = useState([])

    const { eventOnCreation, events, setEventOnCreation, contacts, actualMonth } = useContext(MainContext)

    const { setEventElement, dayDate, dayNr, thisDay, day } = props

    let mondays = [0, 7, 14, 21, 28]
    let tuesdays = mondays.map(day => day + 1)
    let wednesdays = tuesdays.map(day => day + 1)
    let thursdays = wednesdays.map(day => day + 1)
    let fridays = thursdays.map(day => day + 1)
    let saturdays = fridays.map(day => day + 1)
    let sundays = saturdays.map(day => day + 1)

    const showPossibleContacts = (e) => {

        let dummyContacts = []

        if (e.target.value === "") { setPosibleContacts(dummyContacts); return }

        let filteredFriends = c.filter(friend => friend.name.toLowerCase().includes(e.target.value))

        if (filteredFriends.length === 0) {
            contacts.forEach(contact => {
                if (contact.name.toLowerCase().includes(e.target.value.toLowerCase()) && !dummyContacts.includes(contact)) {
                    dummyContacts.push(contact)
                }
            })
        }

        setPosibleContacts(dummyContacts)
    }

    return (<>

        <span id="close-event-on-creation" onClick={() => {
            setEventElement([]);
            setEventFriend([]);
            setEventOnCreation(false)
        }}>
            X</span>
        <ul className="event-contacts-thumbnails">
            {contacts && contacts.map((contact, i) => {
                return (<li>
                    <img onClick={() => {
                        setPosibleContacts([]);
                        setEventFriend((prev) => !prev.includes(contact) ? [...prev, contact] :
                            [...prev])
                    }} style={{ top: `${((i + 1) * 100) + 120}px` }}
                        alt="contact-picture" className="on-creation-contact-thumbnail" src={contact.thumbnail} />
                </li>)
            })}
        </ul>

        {events && events.map(event => {
            if (event.date === dayDate) return (
                <span key={event.title} style={{
                    backgroundColor: event.contactType === 'friend' ? 'lightgreen'
                        : 'rgb(237, 193, 193)'
                }}
                    className="event-day">
                    <span className="event-place">{event.place}</span> <span className="event-title">{event.title}</span></span>)
            else return null
        })
        }


        <span className={dayNr === thisDay && thisMonth === actualMonth ?
            "month-cal-day-nr today" : "month-cal-day-nr"}>{dayNr}</span>
        <form>
            <div id="event-on-creation-date">
                <span className={dayNr === thisDay && thisMonth === actualMonth ?
                    "month-cal-day-nr today" : "month-cal-day-nr"}>{mondays.includes(day) ? 'Monday' : tuesdays.includes(day) ? 'Tuesday' : wednesdays.includes(day) ? 'Wednesday' :
                        thursdays.includes(day) ? 'Thursday' : fridays.includes(day) ? 'Friday' : saturdays.includes(day) ? 'Saturday' : 'Sunday'}
                    {" "}{dayNr}
                </span>
            </div>
            <div id="event-creation-categories">
                <div>
                    <label>Friends</label>
                    <div id="event-creation-friends-input" >
                        {eventFriend && eventFriend.map(friend => {
                            return <p><img className="event-creation-friends-img" src={friend.thumbnail} />{friend.name}
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
                </div>
                <div>
                    <label>Event Place</label>
                    <input required placeholder="Enter place"></input>
                </div>

            </div>
            <div className="event-creation-description">
                <label>Event Description</label>
                <textarea placeholder="Write event here..."></textarea>
            </div>

            <Button onClick={() => setEventOnCreation(false)} id="new-event-button">SAVE</Button>
        </form>
    </>)
}