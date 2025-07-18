import { useState, useEffect, createContext } from 'react';

const CalendarContext = createContext();

const thisMonth = new Date().getMonth()

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const CalendarContextProvider = (props) => {

    const [actualMonth, setActualMonth] = useState(thisMonth)
    const [chosenMonth, setChosenMonth] = useState(allMonths[actualMonth])
    const [chosenDate, setChosenDate] = useState('')
    const [chosenDay, setChosenDay] = useState('')

    useEffect(() => {
        setChosenMonth(allMonths[actualMonth])
    }, [actualMonth])

    useEffect(() => {

        if (chosenDate) {

            let firstDash = chosenDate.indexOf('-') + 1 === '0' ? chosenDate.indexOf('-') + 2 :
                chosenDate.indexOf('-') + 1;

            let secondDash = chosenDate.lastIndexOf('-')

            let dateMonth = Number(chosenDate.slice(firstDash, secondDash)) - 1
            let dateDay = chosenDate.slice(secondDash + 1, chosenDate.length)
            dateDay = dateDay[0] === '0' ? dateDay[1] : dateDay

            setChosenDay(dateDay)
            setActualMonth(dateMonth)
        }
    }, [chosenDate])

    const contextValues = {
        actualMonth,
        setActualMonth,
        chosenMonth,
        setChosenMonth,
        chosenDate,
        setChosenDate,
        chosenDay,
        setChosenDay
    }

    return (<>
        <CalendarContext.Provider value={contextValues}>
            {props.children}
        </CalendarContext.Provider>
    </>
    )
}

export default CalendarContext