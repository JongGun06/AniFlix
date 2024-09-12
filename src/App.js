import './App.css';
import Api from './components/Api';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import Catalog from './components/Catalog';
import Search from './components/Search';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/watch/:id' element={<Api/>}/>
          <Route path='/day' element={<Main/>}/>
          <Route path='/' element={<Catalog/>}/>
          <Route path='/search' element={<Search/>}/>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
