import { useState, useEffect, useContext } from 'react'

import MainContext from '../../contexts/MainContext.jsx'

import MonthCalendar from './subcalendars/MonthCalendar.jsx'

const MainCalendar = () => {

    const [calendarType, setCalendarType] = useState('month')

    const { calendarOption } = useContext(MainContext)


    useEffect(() => {
        setCalendarType(calendarOption)
    }, [])


    return (
        <>
            <div>
                {calendarType === 'month' && <MonthCalendar />}
            </div>
        </>
    )
}


export default MainCalendar

