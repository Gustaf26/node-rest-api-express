import { useContext } from 'react'

import MainContext from "./contexts/MainContext";
import Home from './pages/Home/Home.jsx';

import './assets/App.css'

function App() {

  const { eventOnCreation } = useContext(MainContext);

  return (
    <>
      <Home />
    </>
  )
}

export default App
