import Menu from './components/menu'
import Options from './components/Options';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Content from './components/Content';
import Geral from './components/Geral';
import './App.css';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Content />
      </BrowserRouter>

    </div>
  )
}

export default App