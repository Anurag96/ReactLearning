import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/general' element={<News key="general" pageSize={6} country="in" category="general" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/business' element={<News key="business"  pageSize={6} country="in" category="business" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/entertainment' element={<News  key="entertainment" pageSize={6} country="in" category="entertainment" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/health' element={<News  key="health" pageSize={6} country="in" category="health" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/science' element={<News key="science"  pageSize={6} country="in" category="science" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/sports' element={<News  key="sports" pageSize={6} country="in" category="sports" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/technology' element={<News  key="technology" pageSize={6} country="in" category="technology" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
        </Routes>
      </Router>
    )
  }
}

{/* <div>
        <Navbar/>
        <News pageSize={6} country="in" category="general"/>
      </div> */}