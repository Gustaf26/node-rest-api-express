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

    return (
        <header>
            <button>Today</button>
            <div id="month-header-container" style={{ animation: alertMonthLimit ? 'blink 1s linear' : '' }}>
                <KeyboardArrowLeftIcon onClick={() => {
                    updateMonthAndReset('minus')

                }} />
                <span id="month-span">{chosenMonth} 2025</span>
                <KeyboardArrowRightIcon onClick={() => {
                    updateMonthAndReset('plus')
                }} />
            </div>
            <input placeholder="Search" />
            <ButtonGroup variant="contained" aria-label="Basic button group">
                {periodOptions.map((period, i) => {
                    return (<Button onClick={() => updatePeriod(i, period)}
                        className={i === selectedPeriod && "selected-period"}>{period}</Button>)
                })}
            </ButtonGroup>
            <form onSubmit={(e) => { e.preventDefault(); setChosenDate(e.target[0].value); setEventOnCreation(true) }}>
                <input onChange={(e) => setChosenDate(e.target.value)} type="date" id="new-event-input" name="event-input" />
                <Button type="submit" id="new-event-button">+ New Event</Button>
            </form>

        </header>
    )
}