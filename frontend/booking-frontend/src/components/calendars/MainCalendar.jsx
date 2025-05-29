import { useContext } from 'react'

import MainContext from '../../contexts/MainContext.jsx'

import MonthCalendar from './subcalendars/MonthCalendar.jsx'
import WeekCalendar from './subcalendars/WeekCalendar.jsx'

const MainCalendar = () => {

    const { calendarOption } = useContext(MainContext)


    return (
        <>
            <div>
                {calendarOption === 'month' && <MonthCalendar />}
                {calendarOption === 'week' && <WeekCalendar />}
            </div>
        </>
    )
}


export default MainCalendar

