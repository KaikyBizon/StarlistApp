import { Tabela } from './Tabela'
import Navbar from '../components/Navbar';
import { Informacao } from './Informacao';
import { Informacao2 } from './Informacao2';
import Options from './Options';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./GerenciarEquipe.css"

function App() {

  return (
    <div className="App">
      <Navbar />
      <Options />
      <Informacao />
      <Tabela />
      <Informacao2 />
      <Tabela />
    </div>
  )
}

export default App