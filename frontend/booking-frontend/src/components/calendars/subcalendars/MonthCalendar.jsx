import { useState, useEffect, useContext } from "react"

import MainContext from "../../../contexts/MainContext"

const thisMonth = new Date().getMonth() + 1
const monthDays = thisMonth % 2 === 0 && thisMonth !== 2 ? 30 : thisMonth % 2 === 0 ? 28 : 31
const weekDays = 35

const WeekCell = (props) => {

    let day = props.day

    let mondays = [0, 7, 14, 21, 28]
    let tuesdays = mondays.map(day => day + 1)
    let wednesdays = tuesdays.map(day => day + 1)
    let thursdays = wednesdays.map(day => day + 1)
    let fridays = thursdays.map(day => day + 1)
    let saturdays = fridays.map(day => day + 1)
    let sundays = saturdays.map(day => day + 1)

    console.log(props.dayDate)

    return (<div className={day === props.today ? "month-calendar-day today" : "month-calendar-day"}>
        {mondays.includes(day) ? 'Mon' : tuesdays.includes(day) ? 'Tue' : wednesdays.includes(day) ? 'Wed' :
            thursdays.includes(day) ? 'Thu' : fridays.includes(day) ? 'Fri' : saturdays.includes(day) ? 'Sat' : 'Sun'}
        {props.events.map(event => {
            if (event.date === props.dayDate) return (<span style={{ backgroundColor: event.contactType === 'friend' ? 'lightgreen' : 'crimson' }}
                className="event-day">{event.place}-{event.title}</span>)
            else return null
        })}
        <span className={day === props.today ? "month-cal-day-nr today" : "month-cal-day-nr"}>{props.dayNr}</span>
    </div>)
}


const MonthCalendar = () => {

    const [thisMonthDays, setThisMonthDays] = useState(monthDays)
    const today = new Date().getDate()
    const month = new Date().getMonth()
    const [weekCells, setWeekCells] = useState([])
    const startingDay = new Date(`2025-${month + 1}-01`).getDay()

    const { events } = useContext(MainContext)


    useEffect(() => {

        let allWeekdays = []
        let dayNumber = 0


        for (let j = 0; j < weekDays; j++) {

            let dayDate

            if (j >= startingDay) {
                dayNumber++;
                dayDate = "2025-" + thisMonth.toString() + `-${dayNumber}`
            }
            allWeekdays.push(
                <WeekCell events={events.length > 0 ? events : []} dayDate={dayDate} day={j} today={today} key={"weekday" + j} dayNr={(dayNumber >= 1) && (dayNumber <= thisMonthDays) ? dayNumber : ''}>
                </WeekCell>
            )
        }

        setWeekCells(allWeekdays)

    }, [events])

    return (<div id="months-calendar-container">
        {weekCells.length > 0 && weekCells.map(weekcell => {
            return weekcell
        })}
    </div>)
}

export default MonthCalendar