import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CardDetail from './components/CardDetail';



function App() {
  return (
    <BrowserRouter>
    <div >
      <Routes>
      <Route  path='/' element = {<LandingPage/>}/>
      </Routes>
    </div>
    <div >
      <Routes>
      <Route  path='/home' element = {<Home/>}/>
      </Routes>
    </div>
    <div >
      <Routes>
      <Route  path='/pokemons/:id' element = {<CardDetail/>}/>
      </Routes>
    </div>

    </BrowserRouter>
  );
}

export default App;