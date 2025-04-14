import { useState, useEffect, useContext } from 'react'

import SideMenu from './components/menu/SideMenu.jsx'
import MainContext from "./contexts/MainContext";
import ContactList from './components/contacts/contactList.jsx';

import './App.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


function App() {

  const { sideOption } = useContext(MainContext);

  const [selectedPeriod, setPeriod] = useState(0)

  const periodButtons = ['Month', 'Week', 'Day']

  return (
    <>
      <SideMenu />
      <div id="container">
        <header>
          <button>Today</button>
          <span id="month-span">July 2025</span>
          <input placeholder="Search" />
          <ButtonGroup variant="contained" aria-label="Basic button group">
            {periodButtons.map((period, i) => {
              return (<Button onClick={() => setPeriod(i)} className={i === selectedPeriod && "selected-period"}>{period}</Button>)
            })}
          </ButtonGroup>
          <Button id="new-event-button">+ New Event</Button>
        </header>

        <aside>
          {sideOption === 'Users' && <ContactList />}
        </aside>
        <section>
          <p>THIS IS A SECTION</p>
        </section>
      </div>
    </>
  )
}

export default App
