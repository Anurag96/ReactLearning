import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [mode,setMode]= useState('light')

 const toggleMode = ()=>{
    if(mode==='light'){
      setMode('dark')
      document.body.style.backgroundColor='#042743'
    }else{
      setMode('light')
      document.body.style.backgroundColor='white'
    }
  }

  return (
   <>
   <Router>
     <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      <Routes>
      <Route path="/" element={ <TextForm heading="TextUtils - Word Counter, Chracter Counter, Add Extra Space, Reverse Text" mode={mode}/>}></Route>
      <Route path="/about" element={<About mode={mode}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

