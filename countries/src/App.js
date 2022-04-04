import './App.css';
import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail';
import Error from './components/Error';
import {BrowserRouter, Routes, Route} from 'react-router-dom'



function App() {


  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path ='/' element={<Countries/>} />
          <Route path ='/Countries' element={<Countries/>} />
          <Route path ='/Details/:cioc' element={<CountryDetail />} />
          <Route path ='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
