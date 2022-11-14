import { useState } from 'react';
// import About from './components/About';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';


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
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container">
      <TextForm showAlert={showAlert} mode={mode} heading="Enter the text to analyse below"/>
      {/* <About/> */}
      </div>
     </>
  );
}

export default App;
