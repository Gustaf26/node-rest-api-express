
import { useState, useEffect, useContext } from "react"
import MainContext from "../../../../contexts/MainContext"

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import EventOnCreation from '../../../../components/EventOnCreation'

let todaysWeekDayNr = new Date().getDay()
const todaysDate = new Date().getDate()

const DayCell = (props) => {

    const { setEventOnCreation, eventOnCreation, events } = useContext(MainContext)
    const [eventElement, setEventElement] = useState()

    let weekDayNr = props.weekDayNr

    let allWeekDaysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fre', 'Sat', 'Sun']

    const activateDay = (e) => {

        let allDayEls = [...document.querySelectorAll('.week-calendar-day')]

        // Reset all styles
        allDayEls.forEach((dayEl) => {
            if ([...dayEl.classList].includes('active')) { dayEl.classList.remove('active') }
        })
        // Add style class to chosen day
        e.target.classList.add('active')
    }

    const featureDayAndReset = (e) => {

        // Close modal if it is open by clicking in featuredday
        if (eventOnCreation) setEventOnCreation(false);
        // Changing styles for the day
        activateDay(e);
        // Choosing element as featured day
        props.setFeaturedDay({ date: props.dayNr, weekDay: allWeekDaysName[weekDayNr - 1] })
    }


    return (<div id={props.dayNr} key={"week-calendar-day" + weekDayNr}

        onClick={(e) => featureDayAndReset(e)}
        onDoubleClick={(e) => {
            setEventOnCreation(prev => !prev);
            setEventElement(!eventOnCreation ? Number(e.target.id) : '');
        }}
        className={eventElement === props.dayNr && eventOnCreation ? 'eventOnCreation' :
            weekDayNr === todaysWeekDayNr && props.dayNr === todaysDate ?
                "week-calendar-day today" :
                isNaN(props.dayNr) ? "week-calendar-day empty" :
                    "week-calendar-day"}>

        {!eventOnCreation && <span className={weekDayNr === props.todaysWeekDayNr && props.dayNr == todaysDate ? "week-cal-day-nr today" : "week-cal-day-nr"}>
            {allWeekDaysName[weekDayNr - 1]}{"  "}{props.dayNr >= 1 && props.dayNr <= props.monthDays ? props.dayNr : ''}</span>}

        {!eventOnCreation && props.events && events.map(event => {
            if (event.date === props.dayDate) return (
                <span key={event.title}
                    className="event-day">Event Day</span>)
            else return null
        })}

        {eventElement === props.dayNr && eventOnCreation && (
            <EventOnCreation
                day={weekDayNr - 1}
                dayNr={props.dayNr}
                thisDay={todaysDate}
                dayDate={props.dayDate}
                setEventElement={setEventElement} />)}

    </div>)
}



export default function WeekCalendar() {

    const { events, actualMonth, eventOnCreation, contacts, setActualMonth } = useContext(MainContext)

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

        // This date will be reference for resting week days (first day in week)
        let referenceDate

        // Let´s change referenceDate according to action type
        switch (action) {
            case 'plus':
                referenceDate = referenceMonday + 7
                break;
            case 'minus':
                referenceDate = referenceMonday - 7
                break;
            case 'clear':
                referenceDate = 1 - (new Date(`2025-${actualMonth}-1`).getDay())
                break;
            default:
                referenceDate = (new Date().getDate()) - (new Date().getDay()) + 1
        }


        // If first date is more than all month days or less than a week, cancel updating
        if ((referenceDate) > (monthDays) || referenceDate <= -6) {
            return
        }

        // Reset featured day and its events
        setFeaturedDay('')
        setFeaturedEvents([])

        setReferenceMonday(action !== 'clear' ? referenceDate : 1)

        // Adding or substracting week
        if (action === 'plus') { setPlusIndex(prev => prev + 1); setMinusIndex(prev => prev - 1) }
        else if (action === 'minus') { setMinusIndex(prev => prev + 1); setPlusIndex(prev => prev - 1) }
        // Or just resetting it
        else setMinusIndex(1); setPlusIndex(1)


        // Let´s create 7 days for a week
        for (let j = 0; j < 7; j++) {

            let dayDate = `2025-${actualMonth + 1}-${referenceDate + j}`
            let dayNr = new Date(dayDate).getDate()

            allWeekdays.push(
                <DayCell dayNr={dayNr} setFeaturedDay={setFeaturedDay} actualMonth={actualMonth} events={events.length > 0 ? events : []} dayDate={dayDate}
                    monthDays={monthDays} weekDayNr={j + 1} todaysWeekDayNr={todaysWeekDayNr} key={"weekday" + j}>
                </DayCell>
            )
        }

        setWeekCells(allWeekdays)

    }


    // This side effect just shows the events in featured day
    useEffect(() => {

        if (featuredDay) {

            const featuredEvsDummy = []

            if (events.length > 0) events.map(event => {
                if (event.date === `2025-${actualMonth + 1}-${featuredDay.date}`) {

                    featuredEvsDummy.push((<div className="event-day">
                        <span className="event-place">{event.place}</span>-<span className="event-title">{event.title}</span>
                        <p>Invited: {event.persons.map(personid => {
                            return contacts.map(contact => {
                                return contact.id === personid ? <span>{contact.name}</span> :
                                    null
                            })
                        })}</p>
                    </div >))

                }
            })

            // If no events that day, we show empty message
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
            {featuredDay ? (
                <p className="featured-day-info"><span>{featuredDay.weekDay}</span>
                    <span>{featuredDay.date}</span>
                </p>) : <p className="featured-day-info">
                <em>Click on the days in the calendar above</em>
            </p>}
            {featuredDayEvents && featuredDayEvents.map(event => event)}
        </div>

    </div>)
}

