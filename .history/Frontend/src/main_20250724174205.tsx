import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>,
)
