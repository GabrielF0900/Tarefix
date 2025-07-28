import './App.css'
import { Button } from './components/button'


function App() {
  return (
    <>
      <h1>Hello World</h1>
      <Button name="Salvar" onClick={() => alert("Salvado")}/>
      <Button name="Editar"/>
      <Button name="Enviar"/>
    </>
  )
}

export default App
