import { useState, useEffect, useContext } from 'react'

import MainContext from '../../contexts/MainContext.jsx'
// import EventContext from "../../contexts/MainContext"''
// import { EventContextProvider } from '../../contexts/EventsContext.jsx'

import MonthCalendar from './subcalendars/MonthCalendar.jsx'
import WeekCalendar from './subcalendars/WeekCalendar.jsx'
// import EventOnCreation from './subcalendars/EventOnCreation.jsx'

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

