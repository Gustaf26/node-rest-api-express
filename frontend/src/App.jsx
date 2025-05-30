import { useContext } from 'react'

import SideMenu from './components/menu/SideMenu.jsx'
import Header from './components/Header.jsx';
import MainContext from "./contexts/MainContext";
import MainCalendar from './pages/Home/calendars/MainCalendar.jsx';
import DayGoalsList from './pages/Home/dayGoals/DayGoalsList.jsx';

import './assets/App.css'

function App() {

  const { eventOnCreation } = useContext(MainContext);

  return (
    <>
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
    </>
  )
}

export default App
