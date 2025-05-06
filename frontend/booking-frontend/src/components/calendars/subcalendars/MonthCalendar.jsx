import { useState, useEffect, useContext } from "react"

import MainContext from "../../../contexts/MainContext"

import Button from '@mui/material/Button';
import EventOnCreation from './EventOnCreation'

const weekDays = 35
const today = new Date().getDate()
const thisMonth = new Date().getMonth()

const WeekCell = (props) => {

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

        {eventElement === dayNr && eventOnCreation && (<EventOnCreation day={day} dayNr={dayNr} thisDay={thisDay} dayDate={dayDate} setEventElement={setEventElement} />)}

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