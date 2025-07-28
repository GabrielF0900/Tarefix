import './App.css'
import { Button } from './components/button'
import { useMessage } from './hooks/useMessage'





function App() {
 
   const message = useMessage();

  return (
   
    <>
      <h1>Hello World</h1>
      <Button name="Adicionar" onClick={() => message.show()}/>
      <span>0</span>
      <Button name="Remover"/>
    </>
  )
}

export default App
