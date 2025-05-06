import { useState, useEffect, useContext } from "react"

import MainContext from "../../../contexts/MainContext"

import Button from '@mui/material/Button';
import EventOnCreation from './EventOnCreation'

// const thisMonth = new Date().getMonth() + 1
const weekDays = 35
const today = new Date().getDate()
const thisMonth = new Date().getMonth()

const WeekCell = (props) => {

    // const [activeDay, setActiveDay] = useState()
    const [eventFriend, setEventFriend] = useState([])
    const [posibleContacts, setPosibleContacts] = useState([])

    const { eventOnCreation, setEventOnCreation, contacts } = useContext(MainContext)

    const { day, dayNr, events, thisDay, dayDate, actualMonth, eventElement, setEventElement } = props.weekCellProps

    let mondays = [0, 7, 14, 21, 28]
    let tuesdays = mondays.map(day => day + 1)
    let wednesdays = tuesdays.map(day => day + 1)
    let thursdays = wednesdays.map(day => day + 1)
    let fridays = thursdays.map(day => day + 1)
    let saturdays = fridays.map(day => day + 1)
    let sundays = saturdays.map(day => day + 1)

    const activateDay = (e) => {

        let allDayEls = [...document.querySelectorAll('.month-calendar-day')]

        allDayEls.forEach((dayEl) => {

            if ([...dayEl.classList].includes('active')) { dayEl.classList.remove('active') }
        })
        e.target.classList.add('active')
    }

    const showPossibleContacts = (e) => {

        let dummyContacts = []

        if (e.target.value === "") { setPosibleContacts(dummyContacts); return }

        let filteredFriends = eventFriend.filter(friend => friend.name.toLowerCase().includes(e.target.value))

        if (filteredFriends.length === 0) {
            contacts.forEach(contact => {
                if (contact.name.toLowerCase().includes(e.target.value.toLowerCase()) && !dummyContacts.includes(contact)) {
                    dummyContacts.push(contact)
                }
            })
        }

        setPosibleContacts(dummyContacts)
    }


    return (<div id={dayNr} key={'month-week-cell' + dayNr} onClick={(e) => {
        !eventOnCreation && activateDay(e);
        eventOnCreation && eventElement !== dayNr && setEventOnCreation(false);
    }} onDoubleClick={(e) => {
        setEventOnCreation(true);
        setEventElement(() => Number(e.target.id));
    }}
        className={eventElement === dayNr && eventOnCreation ? 'eventOnCreation' : dayNr === thisDay && thisMonth === actualMonth ? "month-calendar-day today"
            : dayNr === "" ? "month-calendar-day empty" :
                "month-calendar-day"}>

        {
            eventElement !== dayNr && !eventOnCreation && (<span>{mondays.includes(day) ? 'Mon' : tuesdays.includes(day) ? 'Tue' : wednesdays.includes(day) ? 'Wed' :
                thursdays.includes(day) ? 'Thu' : fridays.includes(day) ? 'Fri' : saturdays.includes(day) ? 'Sat' : 'Sun'}</span>)
        }

        {
            eventElement !== dayNr && !eventOnCreation && events && events.map(event => {
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

        {
            eventElement !== dayNr && !eventOnCreation && <span className={dayNr === thisDay && thisMonth === actualMonth ?
                "month-cal-day-nr today" : "month-cal-day-nr"}>{dayNr}</span>
        }

        {eventElement === dayNr && eventOnCreation && (<EventOnCreation day={day} dayDate={dayDate} dayNr={dayNr} thisDay={thisDay} dayDate={dayDate} setEventElement={setEventElement} />)}

        {/* {eventElement === dayNr && eventOnCreation && <span id="close-event-on-creation" onClick={() => {
            setEventElement([]);
            setEventFriend([]);
            setEventOnCreation(false)
        }}>
            X</span>} */}

        {/* <ul className="event-contacts-thumbnails">
            {eventElement === dayNr && eventOnCreation && contacts && contacts.map((contact, i) => {
                return (<li>
                    <img onClick={() => {
                        setPosibleContacts([]);
                        setEventFriend((prev) => !prev.includes(contact) ? [...prev, contact] :
                            [...prev])
                    }} style={{ top: `${((i + 1) * 100) + 120}px` }}
                        alt="contact-picture" className="on-creation-contact-thumbnail" src={contact.thumbnail} />
                </li>)
            })}
        </ul> */}


        {/* {
            eventElement === dayNr && eventOnCreation && (
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
                </form> */}
        {/* ) */}
        {/* } */}
    </div >)
}


const MonthCalendar = () => {

    const { events, actualMonth, eventOnCreation } = useContext(MainContext)

    const [weekCells, setWeekCells] = useState([])
    const [monthDays, setMonthDays] = useState((actualMonth + 1) % 2 === 0 && (actualMonth + 1) !== 2 ? 30 : (actualMonth + 1) % 2 === 0 ? 28 : 31)
    const [eventElement, setEventElement] = useState()


    useEffect(() => {

        let allWeekdays = []
        let dayNumber = 0

        let preliminaryStart = new Date(`2025-${actualMonth + 1}-01`).getDay()

        let preliminaryMonthDays

        if ((actualMonth + 1) <= 7) {

            preliminaryMonthDays = (actualMonth + 1) % 2 === 0 && (actualMonth + 1) !== 2 ? 30
                : (actualMonth + 1) % 2 === 0 ? 28 : 31
        }
        else preliminaryMonthDays = (actualMonth + 1) % 2 === 0 ? 31 : 30

        setMonthDays(preliminaryMonthDays)

        for (let j = 0; j < weekDays; j++) {

            let dayDate

            if (j >= preliminaryStart - 1) {
                dayNumber++;
                dayDate = "2025-" + (actualMonth + 1).toString() + `-${dayNumber}`
            }

            let weekCellProps = {
                eventElement,
                setEventElement,
                events: events.length > 0 ? events : [],
                thisDay: today,
                dayNr: (dayNumber >= 1) && (dayNumber <= preliminaryMonthDays) ? dayNumber : '',
                actualMonth,
                dayDate,
                day: j

            }
            allWeekdays.push(
                <WeekCell weekCellProps={{
                    eventElement,
                    setEventElement,
                    events: events.length > 0 ? events : [],
                    thisDay: today,
                    dayNr: (dayNumber >= 1) && (dayNumber <= preliminaryMonthDays) ? dayNumber : '',
                    actualMonth,
                    dayDate,
                    day: j
                }
                } key={"weekday" + j}>
                </WeekCell >
            )
        }

        setWeekCells(allWeekdays)

    }, [actualMonth, events, eventElement])

    return (<div id="months-calendar-container" className={eventOnCreation ? 'modal' : ''}>
        {weekCells.length > 0 && weekCells.map(weekcell => {
            return weekcell
        })}
    </div>)
}

export default MonthCalendar