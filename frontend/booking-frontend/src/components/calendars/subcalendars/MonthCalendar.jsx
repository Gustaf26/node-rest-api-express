
import { useState, useEffect } from "react"


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

    return (<div className={day === props.today ? "month-calendar-day today" : "month-calendar-day"}>
        {mondays.includes(day) ? 'Mon' : tuesdays.includes(day) ? 'Tue' : wednesdays.includes(day) ? 'Wed' :
            thursdays.includes(day) ? 'Thu' : fridays.includes(day) ? 'Fri' : saturdays.includes(day) ? 'Sat' : 'Sun'}

        <span className={day === props.today ? "month-cal-day-nr today" : "month-cal-day-nr"}>{props.dayNr}</span>
    </div>)
}


const MonthCalendar = () => {

    const [thisMonthDays, setThisMonthDays] = useState(monthDays)
    const today = new Date().getDate()
    const month = new Date().getMonth()
    const [weekCells, setWeekCells] = useState([])
    const startingDay = new Date(`2025-${month + 1}-01`).getDay()


    useEffect(() => {

        let allWeekdays = []
        let dayNumber = 0

        for (let j = 0; j < weekDays; j++) {

            if (j >= startingDay) dayNumber++
            allWeekdays.push(
                <WeekCell day={j} today={today} key={"weekday" + j} dayNr={(dayNumber >= 1) && (dayNumber <= thisMonthDays) ? dayNumber : ''}>
                </WeekCell>
            )
        }

        setWeekCells(allWeekdays)

    }, [])

    return (<div id="months-calendar-container">
        {weekCells.length > 0 && weekCells.map(weekcell => {
            return weekcell
        })}
    </div>)
}

export default MonthCalendar