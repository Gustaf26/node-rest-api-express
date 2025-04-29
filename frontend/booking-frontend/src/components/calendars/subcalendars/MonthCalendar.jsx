import { useState, useEffect, useContext } from "react"

import MainContext from "../../../contexts/MainContext"

// const thisMonth = new Date().getMonth() + 1
const weekDays = 35
const today = new Date().getDate()
const thisMonth = new Date().getMonth()

const WeekCell = (props) => {

    const [activeDay, setActiveDay] = useState()

    let day = props.day

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


    return (<div key={"month-calendar-day" + props.dayNr} onClick={(e) => activateDay(e)} className={day === props.today && thisMonth === props.actualMonth ? "month-calendar-day today" : props.dayNr === "" ? "month-calendar-day empty" :
        "month-calendar-day"}>

        {mondays.includes(day) ? 'Mon' : tuesdays.includes(day) ? 'Tue' : wednesdays.includes(day) ? 'Wed' :
            thursdays.includes(day) ? 'Thu' : fridays.includes(day) ? 'Fri' : saturdays.includes(day) ? 'Sat' : 'Sun'}

        {props.events.map(event => {
            if (event.date === props.dayDate) return (<span key={event.title} style={{ backgroundColor: event.contactType === 'friend' ? 'lightgreen' : 'rgb(237, 193, 193)' }}
                className="event-day"><span className="event-place">{event.place}</span> <span className="event-title">{event.title}</span></span>)
            else return null
        })}

        <span className={day === props.today && thisMonth === props.actualMonth ? "month-cal-day-nr today" : "month-cal-day-nr"}>{props.dayNr}</span>
    </div>)
}


const MonthCalendar = () => {

    const { events, actualMonth } = useContext(MainContext)

    const [weekCells, setWeekCells] = useState([])
    const [monthDays, setMonthDays] = useState((actualMonth + 1) % 2 === 0 && (actualMonth + 1) !== 2 ? 30 : (actualMonth + 1) % 2 === 0 ? 28 : 31)

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
                <WeekCell actualMonth={actualMonth} events={events.length > 0 ? events : []} dayDate={dayDate} day={j} today={today} key={"weekday" + j}
                    dayNr={(dayNumber >= 1) && (dayNumber <= preliminaryMonthDays) ? dayNumber : ''}>
                </WeekCell>
            )
        }

        setWeekCells(allWeekdays)

    }, [actualMonth, events])

    return (<div id="months-calendar-container">
        {weekCells.length > 0 && weekCells.map(weekcell => {
            return weekcell
        })}
    </div>)
}

export default MonthCalendar