
import { useState, useEffect, useContext } from "react"

import MainContext from "../../../contexts/MainContext"

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


let todaysWeekDayNr = new Date().getDay()

const thisMonth = new Date().getMonth()

const todaysDate = new Date().getDate()

const DayCell = (props) => {

    let weekDayNr = props.weekDayNr

    let allWeekDaysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fre', 'Sat', 'Sun']

    const activateDay = (e) => {

        let allDayEls = [...document.querySelectorAll('.week-calendar-day')]

        allDayEls.forEach((dayEl) => {

            if ([...dayEl.classList].includes('active')) { dayEl.classList.remove('active') }
        })
        e.target.classList.add('active')
    }


    return (<div key={"week-calendar-day" + weekDayNr} onClick={(e) => activateDay(e)}
        className={weekDayNr === todaysWeekDayNr && props.dayDate === todaysDate ?
            "week-calendar-day today" : "week-calendar-day"}>

        {/* {props.events.map(event => {
            if (event.date === props.dayDate) return (<span key={event.title} style={{
                backgroundColor: event.contactType === 'friend' ? 'lightgreen'
                    : 'crimson'
            }}
                className="event-day">{event.place}-{event.title}</span>)
            else return null
        })} */}

        <span className={weekDayNr === props.todaysWeekDayNr && props.dayDate == todaysDate ? "week-cal-day-nr today" : "week-cal-day-nr"}>
            {allWeekDaysName[weekDayNr - 1]}{"  "}{props.dayDate >= 1 ? props.dayDate : ''}</span>
    </div>)
}



export default function WeekCalendar() {

    const { events, actualMonth } = useContext(MainContext)

    const [weekCells, setWeekCells] = useState([])
    const [monthDays, setMonthDays] = useState((actualMonth) % 2 === 0 && (actualMonth) !== 2 && (actualMonth) !== 8 ? 30 : (actualMonth) % 2 === 0 ? 28 : 31)
    const [weekPlusIndex, setPlusIndex] = useState(1)
    const [weekMinusIndex, setMinusIndex] = useState(1)

    const updateCalendar = (action) => {

        let allWeekdays = []

        let todaysDate = new Date().getDate()
        let thisDayNr = new Date().getDay()

        let referenceDate = (action === 'plus') ? todaysDate + (weekPlusIndex * 7) : todaysDate - (weekMinusIndex * 7)

        if ((referenceDate - thisDayNr) > (monthDays) || referenceDate <= -5) {
            return
        }

        if (action === 'plus') { setPlusIndex(prev => prev + 1); setMinusIndex(prev => prev - 1) }
        else { setMinusIndex(prev => prev + 1); setPlusIndex(prev => prev - 1) }


        for (let j = 0; j < 7; j++) {

            let dayDate = new Date(`2025-${thisMonth}-${referenceDate - (todaysWeekDayNr - 1) + j}`).getDate()

            allWeekdays.push(
                <DayCell actualMonth={actualMonth} events={events.length > 0 ? events : []} dayDate={dayDate}
                    weekDayNr={j + 1} todaysWeekDayNr={todaysWeekDayNr} key={"weekday" + j}>
                </DayCell>
            )
        }


        setWeekCells(allWeekdays)

    }

    useEffect(() => {

        let allWeekdays = []
        let todaysDate = new Date().getDate()
        let todaysDayNr = new Date().getDay()

        for (let j = 0; j < 7; j++) {

            let dayDate;


            if (j < todaysWeekDayNr) dayDate = new Date(`2025-${thisMonth}-${todaysDate - (todaysWeekDayNr) + j + 1}`).getDate()
            else if (j === todaysWeekDayNr) dayDate = new Date(`2025-${thisMonth}-${todaysDate + 1}`).getDate()
            else dayDate = new Date(`2025-${thisMonth}-${todaysDate - todaysDayNr + j + 1}`).getDate()

            allWeekdays.push(
                <DayCell actualMonth={actualMonth} events={events.length > 0 ? events : []} dayDate={dayDate}
                    weekDayNr={j + 1} todaysWeekDayNr={todaysWeekDayNr} key={"weekday" + j}>
                </DayCell>
            )
        }


        setWeekCells(allWeekdays)

    }, [])



    return (<div id="week-calendar-container">
        <KeyboardArrowLeftIcon className="left-arrow-week" onClick={() => {
            updateCalendar('minus')
        }} />


        {weekCells.length > 0 && weekCells.map(weekcell => {
            return weekcell
        })}
        <KeyboardArrowRightIcon className="right-arrow-week" onClick={() => {
            updateCalendar('plus')
        }} />
    </div>)

}

