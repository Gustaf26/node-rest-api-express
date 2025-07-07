import { useState, useContext } from 'react'
import CalendarContext from '../pages/Home/contexts/CalendarContext';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import MainContext from '../contexts/MainContext';

const thisMonth = new Date().getMonth()
const periodOptions = ['month', 'week', 'day']

export default function Header() {

    const { setCalendarOption, setEventOnCreation } = useContext(MainContext)
    const { setChosenDate, chosenMonth, setActualMonth, actualMonth } = useContext(CalendarContext)

    const [alertMonthLimit, setAlertMonthLimit] = useState(false)
    const [selectedPeriod, setPeriod] = useState(0)

    const setTodayEvent = () => {

        let todaysDate = new Date().getDate()
        let todaysMonth = new Date().getMonth()
        setActualMonth(todaysMonth)

        let today = "2025-" + (todaysMonth + 1).toString() + `-${todaysDate}`

        setChosenDate(today)
        setEventOnCreation(true)
    }

    const updateMonthAndReset = (action) => {

        setAlertMonthLimit(actualMonth === 0 || actualMonth === 11 ? true : false)

        // Changing month but resetting to default month after "dec" or before "jan"
        if (action === 'minus') {
            setActualMonth(prev => prev === 0 ? thisMonth : prev - 1)
        }
        else {
            setActualMonth(prev => prev === 11 ? thisMonth : prev + 1)
        }
    }

    // Main period options, month, week, day
    const updatePeriod = (index, period) => {
        setPeriod(index); setCalendarOption(period)
    }

    const formatDate = value => {

        let formattedDate = value[5] === '0' ? value.slice(0, 5) + value.slice(6, 10)
            : value

        let secondDash = formattedDate.lastIndexOf('-')

        formattedDate = formattedDate[secondDash + 1] === '0' ? formattedDate.slice(0, secondDash + 1) + formattedDate.slice(secondDash + 2, formattedDate.length)
            : formattedDate

        setChosenDate(formattedDate)

    }

    return (
        <header>
            <button id="today-button" onClick={() => setTodayEvent()}>Today</button>
            <div id="month-header-container" style={{ animation: alertMonthLimit ? 'blink 1s linear' : '' }}>
                <KeyboardArrowLeftIcon onClick={() => {
                    updateMonthAndReset('minus')

                }} />
                <span id="month-span">{chosenMonth} 2025</span>
                <KeyboardArrowRightIcon onClick={() => {
                    updateMonthAndReset('plus')
                }} />
            </div>
            <ButtonGroup aria-label="Basic button group">
                {periodOptions.map((period, i) => {
                    return (<Button onClick={() => updatePeriod(i, period)}
                        className={i === selectedPeriod ? "header-option-button selected-period" :
                            "header-option-button"
                        }>{period}</Button>)
                })}
            </ButtonGroup>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (e.target[0].value) { formatDate(e.target[0].value); setEventOnCreation(true) }
                else alert('You need to pick a date');
            }}>
                <input onChange={(e) => formatDate(e.target.value)} type="date" id="new-event-input" name="event-input" />
                <Button type="submit" id="new-event-button"><span>+ New Event</span></Button>
            </form>

        </header>
    )
}