import './App.css'
import { useMessage } from './hooks/useMessage'
import { BrowserRouter } from 'react-router-dom';




function App() {
 
   const message = useMessage();

  return (
   
   <BrowserRouter>
   <App />
   </BrowserRouter>
  )
}

export default App
