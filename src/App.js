/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';   
import './App.css';
import Usuarios from './components/Usuarios'


function App(){
    return(
      <BrowserRouter>
      <Sidebar />
      <>
        <Routes>
          <Route path='/' element={<Usuarios></Usuarios>}></Route>
        </Routes>
      </>
      </BrowserRouter>
      )
}

export default App;