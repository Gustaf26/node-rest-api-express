import { useContext } from 'react'

import { CalendarContextProvider } from './contexts/CalendarContext.jsx';

import SideMenu from '../../components/menu/SideMenu.jsx';
import Header from '../../components/Header.jsx';
import MainContext from '../../contexts/MainContext.jsx';
import MainCalendar from './calendars/MainCalendar.jsx';
import MonthGoals from './monthGoals/MonthGoals.jsx'
import EventOnCreation from '../../components/EventOnCreation.jsx'

// import './assets/App.css'

function Home() {

    const { eventOnCreation } = useContext(MainContext);

    return (
        <>
            <CalendarContextProvider>
                <SideMenu />
                <div id="container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    height: eventOnCreation ? '100vh' : 'fit-content',
                    overflow: eventOnCreation ? 'hidden' : '',
                }}>
                    <Header />
                    <main>
                        <aside>
                            <MonthGoals />
                        </aside>
                        <section>
                            <MainCalendar />
                        </section>
                    </main>
                    {eventOnCreation && <EventOnCreation />}
                </div>
            </CalendarContextProvider>
        </>
    )
}

export default Home