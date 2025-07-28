import './App.css'
import { Button } from './components/button'


function App() {
  export function useMessage() {
    function show() {
      console.log("Iniciaando meu hook")
    }
  }


  return (
   
    <>
      <h1>Hello World</h1>
      <Button name="Adicionar"/>
      <span>0</span>
      <Button name="Remover"/>
    </>
  )
}

export default App
