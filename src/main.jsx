import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegistroEvento from './RegistroEvento'
import Baja from './Baja'
import Conservar from './Conservar'
import Privacidad from './Privacidad'

// /baja/<código> → baja de comunicaciones; /conservar/<código> → conservar los datos de contacto;
// /privacidad → política de privacidad; cualquier otra ruta → formulario (el primer tramo es el evento)
const tramos = window.location.pathname.split('/').filter(Boolean)
const ruta = tramos[0]?.toLowerCase()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {ruta === 'baja' ? <Baja token={tramos[1]} />
      : ruta === 'conservar' ? <Conservar token={tramos[1]} />
      : ruta === 'privacidad' ? <Privacidad />
      : <RegistroEvento />}
  </StrictMode>,
)
