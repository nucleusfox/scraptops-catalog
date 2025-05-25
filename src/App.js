import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './Main';


function App() {

return(
  // <Main/>


  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}/>
    </Routes>
  </BrowserRouter>
)

}

export default App;
