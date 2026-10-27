import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegistroEvento from './RegistroEvento'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegistroEvento />
  </StrictMode>,
)
