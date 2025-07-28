import './App.css'
import { Button } from './components/button'


 export function useMessage() {
    function show() {
      console.log("Iniciaando meu hook")
    }
    return { show }
  }


function App() {
 
   const message = useMessage();

  return (
   
    <>
      <h1>Hello World</h1>
      <Button name="Adicionar" onClick={() => }/>
      <span>0</span>
      <Button name="Remover"/>
    </>
  )
}

export default App
