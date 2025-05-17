import { useState, useEffect, useContext } from 'react'


import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import MainContext from '../contexts/MainContext';

const thisMonth = new Date().getMonth()
const periodButtons = ['month', 'week', 'day']

export default function Header() {

    const [selectedPeriod, setPeriod] = useState(0)
    const { chosenDate, setChosenDate, chosenMonth, setActualMonth, actualMonth, setCalendarOption, setEventOnCreation } = useContext(MainContext)
    const [alertMonthLimit, setAlertMonthLimit] = useState(false)


    return (
        <header>
            <button>Today</button>
            <div id="month-header-container" style={{ animation: alertMonthLimit ? 'blink 1s linear' : '' }}>
                <KeyboardArrowLeftIcon onClick={() => {
                    if (actualMonth === 0) setAlertMonthLimit(true)
                    else setAlertMonthLimit(false)
                    setEventOnCreation(false)
                    setActualMonth(prev => prev === 0 ? thisMonth : prev - 1)
                }} />
                <span id="month-span">{chosenMonth} 2025</span>
                <KeyboardArrowRightIcon onClick={() => {
                    if (actualMonth === 11) setAlertMonthLimit(true)
                    else setAlertMonthLimit(false)
                    setEventOnCreation(false)
                    setActualMonth(prev => prev === 11 ? thisMonth : prev + 1)
                }} />
            </div>
            <input placeholder="Search" />
            <ButtonGroup variant="contained" aria-label="Basic button group">
                {periodButtons.map((period, i) => {
                    return (<Button onClick={() => { setPeriod(i); setCalendarOption(period) }} className={i === selectedPeriod && "selected-period"}>{period}</Button>)
                })}
            </ButtonGroup>
            <form onSubmit={(e) => { e.preventDefault(); setChosenDate(e.target[0].value); setEventOnCreation(true) }}>
                <input type="date" id="new-event-input" name="event-input" />
                <Button type="submit" id="new-event-button">+ New Event</Button>
            </form>

        </header>
    )
}