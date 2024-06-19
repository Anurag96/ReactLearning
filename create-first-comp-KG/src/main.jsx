import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import Cloak from './cloak-basic/Cloak.jsx'
import Welcome from './Welcome.jsx'
import Fragment from './VegetableFragment/Fragment.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Welcome />} />
      </Routes>
      <Routes>
        <Route path='/todo-basic' element={<App />} />
      </Routes>
      <Routes>
        <Route path='/clock-basic' element={<Cloak />} />
      </Routes>
      <Routes>
        <Route path='/fragment-basic' element={<Fragment />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
