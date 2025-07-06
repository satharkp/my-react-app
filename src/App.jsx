<<<<<<< HEAD
import Todolist from "./Todolist"

function App() {

  return (
    <>
    <Todolist/>
    </>
  )
}

export default App
=======
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <BrowserRouter>
    <nav>
      <Link to='/'>HOME |</Link> 
      <Link to='/home'> ABOUT |</Link> 
      <Link to='/contact'> CONTACT</Link>
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> 65687eabfaaa5de9f6fd81f55c91afd652a43a6f
