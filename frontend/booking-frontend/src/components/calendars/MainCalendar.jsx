import { useState, useEffect, useContext } from 'react'

import MainContext from '../../contexts/MainContext.jsx'
// import EventContext from "../../contexts/MainContext"''
// import { EventContextProvider } from '../../contexts/EventsContext.jsx'

import MonthCalendar from './subcalendars/MonthCalendar.jsx'
import WeekCalendar from './subcalendars/WeekCalendar.jsx'
import EventOnCreation from './subcalendars/EventOnCreation.jsx'
// import EventOnCreation from './subcalendars/EventOnCreation.jsx'

const MainCalendar = () => {

    const { calendarOption, eventOnCreation } = useContext(MainContext)


    return (
        <>
            <div>
                {calendarOption === 'month' && <MonthCalendar />}
                {calendarOption === 'week' && <WeekCalendar />}
                {/* {eventOnCreation && <EventOnCreation />} */}
            </div>
        </>
    )
}


export default MainCalendar

