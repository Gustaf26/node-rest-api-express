
import { useState, useEffect, useContext } from "react"

import MainContext from "../../../contexts/MainContext"

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import EventOnCreation from "./EventOnCreation";


let todaysWeekDayNr = new Date().getDay()

const todaysDate = new Date().getDate()

const DayCell = (props) => {

    const { setEventOnCreation, eventOnCreation } = useContext(MainContext)
    const [eventElement, setEventElement] = useState()

    let weekDayNr = props.weekDayNr

    let allWeekDaysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fre', 'Sat', 'Sun']

    const activateDay = (e) => {

        let allDayEls = [...document.querySelectorAll('.week-calendar-day')]

        allDayEls.forEach((dayEl) => {

            if ([...dayEl.classList].includes('active')) { dayEl.classList.remove('active') }
        })
        e.target.classList.add('active')
    }


    return (<div id={props.dayDate} key={"week-calendar-day" + weekDayNr}
        onClick={(e) => { activateDay(e); props.setFeaturedDay({ date: props.dayDate, weekDay: allWeekDaysName[weekDayNr - 1] }) }}
        onDoubleClick={(e) => {
            setEventOnCreation(true);
            setEventElement(Number(e.target.id));
        }}
        className={eventElement === props.dayDate && eventOnCreation ? 'eventOnCreation' : weekDayNr === todaysWeekDayNr && props.dayDate === todaysDate ?
            "week-calendar-day today" : isNaN(props.dayDate) ? "week-calendar-day empty" : "week-calendar-day"}>

        {props.events.map(event => {
            if (event.date === props.dayDate) return (<span key={event.title} style={{
                backgroundColor: event.contactType === 'friend' ? 'lightgreen'
                    : 'crimson'
            }}
                className="event-day">{event.place}-{event.title}</span>)
            else return null
        })}

        {!eventOnCreation && <span className={weekDayNr === props.todaysWeekDayNr && props.dayDate == todaysDate ? "week-cal-day-nr today" : "week-cal-day-nr"}>
            {allWeekDaysName[weekDayNr - 1]}{"  "}{props.dayDate >= 1 && props.dayDate <= props.monthDays ? props.dayDate : ''}</span>}

        {eventElement === Number(props.dayDate) && eventOnCreation && (
            <EventOnCreation
                day={weekDayNr - 1}
                dayNr={props.dayDate}
                thisDay={todaysDate}
                dayDate={props.dayDate}
                setEventElement={setEventElement} />)}

    </div>)
}



export default function WeekCalendar() {

    const { events, actualMonth, eventOnCreation, setActualMonth } = useContext(MainContext)

    const [weekCells, setWeekCells] = useState([])
    const [monthDays, setMonthDays] = useState((actualMonth) % 2 === 0 && (actualMonth) !== 2 && (actualMonth) !== 8 ? 30 : (actualMonth) % 2 === 0 ? 28 : 31)
    const [weekPlusIndex, setPlusIndex] = useState(1)
    const [weekMinusIndex, setMinusIndex] = useState(1)
    const thisMonth = new Date().getMonth()
    const [referenceMonday, setReferenceMonday] = useState((new Date().getDate()) - (new Date().getDay()) + 1)
    const [featuredDay, setFeaturedDay] = useState()
    const [featuredDayEvents, setFeaturedEvents] = useState([])

    const updateCalendar = (action) => {

        let allWeekdays = []

        let referenceDate = (action === 'plus') ? referenceMonday + 7
            : (action === 'minus') ? referenceMonday - 7
                : (action === 'clear') ? 1 - (new Date(`2025-${actualMonth}-1`).getDay())
                    : (new Date().getDate()) - (new Date().getDay()) + 1


        if ((referenceDate) > (monthDays) || referenceDate <= -6) {
            return
        }

        setReferenceMonday(action !== 'clear' ? referenceDate : 1)

        if (action === 'plus') { setPlusIndex(prev => prev + 1); setMinusIndex(prev => prev - 1) }
        else if (action === 'minus') { setMinusIndex(prev => prev + 1); setPlusIndex(prev => prev - 1) }
        else setMinusIndex(1); setPlusIndex(1)


        for (let j = 0; j < 7; j++) {

            let dayDate = new Date(`2025-${actualMonth}-${referenceDate + j}`).getDate()

            allWeekdays.push(
                <DayCell setFeaturedDay={setFeaturedDay} actualMonth={actualMonth} events={events.length > 0 ? events : []} dayDate={dayDate}
                    monthDays={monthDays} weekDayNr={j + 1} todaysWeekDayNr={todaysWeekDayNr} key={"weekday" + j}>
                </DayCell>
            )
        }


        setWeekCells(allWeekdays)

    }

    useEffect(() => {

        setActualMonth(thisMonth)

    }, [])

    useEffect(() => {

        if (featuredDay) {

            const featuredEvsDummy = []

            if (events.length > 0) events.map(event => {
                if (event.date === `2025-${actualMonth + 1}-${featuredDay.date}`) {
                    featuredEvsDummy.push(<p className="event-day">
                        <span className="event-place">{event.place}</span>-<span className="event-title">{event.title}</span>
                    </p >)
                }
            })

            if (featuredEvsDummy.length === 0) featuredEvsDummy.push(<p>
                <span><em>No Events On This Day</em></span>
            </p >)


            setFeaturedEvents(featuredEvsDummy)
        }

    }, [featuredDay, events, actualMonth])


    useEffect(() => {

        if (actualMonth !== thisMonth) updateCalendar('clear')
        else updateCalendar('reset')

    }, [actualMonth])


    return (<div id="week-super-container">
        <div id="week-container-container">
            <span><KeyboardArrowLeftIcon className="left-arrow-week" onClick={() => {
                updateCalendar('minus')
            }} /></span>
            <div id="week-calendar-container" className={eventOnCreation ? 'modal' : ''}>

                {weekCells.length > 0 && weekCells.map(weekcell => {
                    return weekcell
                })}

            </div>
            <span> <KeyboardArrowRightIcon className="right-arrow-week" onClick={() => {
                updateCalendar('plus')
            }} /></span>
        </div>
        <div id="featured-week-day">
            {featuredDay &&
                <p className="featured-day-info"><span>{featuredDay.weekDay}</span>
                    <span>{featuredDay.date}</span>
                </p>}
            {featuredDayEvents && featuredDayEvents.map(event => event)}
        </div>

    </div>)
}

