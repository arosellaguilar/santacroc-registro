import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegistroEvento from './RegistroEvento'
import Baja from './Baja'

// /baja/<código> → baja de comunicaciones; cualquier otra ruta → formulario (el primer tramo es el evento)
const tramos = window.location.pathname.split('/').filter(Boolean)
const esBaja = tramos[0]?.toLowerCase() === 'baja'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {esBaja ? <Baja token={tramos[1]} /> : <RegistroEvento />}
  </StrictMode>,
)
