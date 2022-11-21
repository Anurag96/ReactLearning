import { useState } from 'react';
import About from './components/About';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [mode,setMode] = useState('light');
  const [alert,setAlert] = useState(null)

  const showAlert =(message,type) =>{
    setAlert({
      msg: message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () =>{
  //  var val = (mode==='light')?'dark':'light'
   if(mode==='light')
    {
      setMode('dark')
      document.body.style.backgroundColor='#042743'
      showAlert('Dark Mode has been enabled','success')
    
    }
    else{
      setMode('light')
      document.body.style.backgroundColor='white'
      
      showAlert('Light Mode has been enabled','success')
    }
  }

  return (
    <>
    <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
      <Routes>
          <Route exact path="/about" element={<About mode={mode}/>}>
          </Route>
          <Route exact path="/" element={<TextForm showAlert={showAlert} mode={mode} heading="TextUtils - Word Counter, Chracter Counter, Add Extra Space, Reverse Text"/>}> 
          </Route>
        </Routes>
      </div>
      </Router>
     </>
  );
}

export default App;
