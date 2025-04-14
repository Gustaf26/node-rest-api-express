
import { useState, useEffect } from "react"


const thisMonth = new Date().getMonth() + 1
const monthDays = thisMonth % 2 === 0 && thisMonth !== 2 ? 30 : thisMonth % 2 === 0 ? 28 : 31

const MonthCalendar = () => {

    const [thisMonthDays, setThisMonthDays] = useState(monthDays)
    const [daysArray, setDaysArray] = useState([])
    const today = new Date().getDate()

    const fillDays = () => {

        let allDaysArray = []
        for (let j = 0; j < thisMonthDays; j++) {
            allDaysArray.push({
                daynr: j + 1,
                events: [],
                id: j,
                today: today === j + 1 ? true : false
            })
        }
        setDaysArray(allDaysArray)
    }

    useEffect(() => {

        fillDays()

    }, [])

    return (<div id="months-calendar-container">
        {daysArray.length > 0 && daysArray.map((day, i) => {
            return (
                <div className={day.today ? "month-calendar-day today" : "month-calendar-day"} key={day.id} >{day.daynr}</div>
            )
        })}
    </div>)
}

export default MonthCalendar