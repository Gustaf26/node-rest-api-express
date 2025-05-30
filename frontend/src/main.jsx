import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.jsx'
import { MainContextProvider } from './contexts/MainContext.jsx'

createRoot(document.getElementById('root')).render(
  <MainContextProvider>
    <App />
  </MainContextProvider>
)
