import { useState, useEffect, useContext } from 'react'

import SideMenu from './components/menu/SideMenu.jsx'
import Header from './components/Header.jsx';
import MainContext from "./contexts/MainContext";
// import ContactList from './components/contacts/contactList.jsx';
import MainCalendar from './components/calendars/MainCalendar.jsx';
import EventsList from './components/EventsList.jsx';

import './App.css'

function App() {

  const { sideOption, eventOnCreation, setEventOnCreation } = useContext(MainContext);

  return (
    <>
      <SideMenu />
      <div id="container" style={{ height: eventOnCreation ? '100vh' : 'fit-content', overflow: eventOnCreation ? 'hidden' : '' }}>
        <Header />
        <aside>
          <EventsList />
        </aside>
        <section>
          <MainCalendar />
        </section>
      </div>
    </>
  )
}

export default App
