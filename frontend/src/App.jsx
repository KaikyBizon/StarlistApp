import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import Content from './components/Content';


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