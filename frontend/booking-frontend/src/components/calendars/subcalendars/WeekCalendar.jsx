
import { useState, useEffect, useContext } from "react"

import MainContext from "../../../contexts/MainContext"


const today = new Date().getDay()
const thisMonth = new Date().getMonth()

const DayCell = (props) => {

    const [activeDay, setActiveDay] = useState()

    let day = props.day

    let allWeekdDaysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fre', 'Sat', 'Sun']

    const activateDay = (e) => {

        let allDayEls = [...document.querySelectorAll('.week-calendar-day')]

        allDayEls.forEach((dayEl) => {

            if ([...dayEl.classList].includes('active')) { dayEl.classList.remove('active') }
        })
        e.target.classList.add('active')
    }


    return (<div key={"week-calendar-day" + props.dayNr} onClick={(e) => activateDay(e)}
        className={day === props.today ?
            "week-calendar-day today" : "week-calendar-day"}>

        {/* {props.events.map(event => {
            if (event.date === props.dayDate) return (<span key={event.title} style={{
                backgroundColor: event.contactType === 'friend' ? 'lightgreen'
                    : 'crimson'
            }}
                className="event-day">{event.place}-{event.title}</span>)
            else return null
        })} */}

        <span className={day === props.today ? "week-cal-day-nr today" : "week-cal-day-nr"}>{allWeekdDaysName[props.dayNr]}{"  "}{props.dayDate}</span>
    </div>)
}



export default function WeekCalendar() {

    const { events, actualMonth } = useContext(MainContext)

    const [weekCells, setWeekCells] = useState([])
    const weekDays = 7

    useEffect(() => {

        let allWeekdays = []
        let dayNumber = 1
        let todaysDate = new Date().getDate()


        // if ((actualMonth + 1) <= 7) {

        //     preliminaryMonthDays = (actualMonth + 1) % 2 === 0 && (actualMonth + 1) !== 2 ? 30
        //         : (actualMonth + 1) % 2 === 0 ? 28 : 31
        // }
        // else preliminaryMonthDays = (actualMonth + 1) % 2 === 0 ? 31 : 30

        // setMonthDays(preliminaryMonthDays)

        for (let j = 0; j < weekDays; j++) {


            dayNumber++;

            let dayDate;

            if (j < today) dayDate = new Date(`2025-${thisMonth}-${todaysDate - today + j}`).getDate()
            else if (j === today) dayDate = new Date(`2025-${thisMonth}-${todaysDate}`).getDate()
            else dayDate = new Date(`2025-${thisMonth}-${todaysDate + j}`).getDate()

            allWeekdays.push(
                <DayCell actualMonth={actualMonth} events={events.length > 0 ? events : []} dayDate={dayDate} day={j} today={today} key={"weekday" + j}
                    dayNr={j}>
                </DayCell>
            )
        }


        setWeekCells(allWeekdays)

    }, [])



    return (<div id="week-calendar-container">
        {weekCells.length > 0 && weekCells.map(weekcell => {
            return weekcell
        })}
    </div>)

}

