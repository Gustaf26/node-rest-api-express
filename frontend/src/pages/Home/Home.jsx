import { useContext } from 'react'

import { CalendarContextProvider } from './contexts/CalendarContext.jsx';

import SideMenu from '../../components/menu/SideMenu.jsx';
import Header from '../../components/Header.jsx';
import MainContext from '../../contexts/MainContext.jsx';
import MainCalendar from './calendars/MainCalendar.jsx';
import DayGoalsList from './dayGoals/DayGoalsList.jsx'

// import './assets/App.css'

function Home() {

    const { eventOnCreation } = useContext(MainContext);

    return (
        <>
            <CalendarContextProvider>
                <SideMenu />
                <div id="container" style={{ height: eventOnCreation ? '100vh' : 'fit-content', overflow: eventOnCreation ? 'hidden' : '' }}>
                    <Header />
                    <aside>
                        <DayGoalsList />
                    </aside>
                    <section>
                        <MainCalendar />
                    </section>
                </div>
            </CalendarContextProvider>
        </>
    )
}

export default Home