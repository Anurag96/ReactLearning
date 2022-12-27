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
  pageSize=5;
  render() {
    return (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/general' element={<News key="general" pageSize={this.pageSize} country="in" category="general" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/business' element={<News key="business"  pageSize={this.pageSize} country="in" category="business" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/entertainment' element={<News  key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/health' element={<News  key="health" pageSize={this.pageSize} country="in" category="health" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/science' element={<News key="science"  pageSize={this.pageSize} country="in" category="science" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/sports' element={<News  key="sports" pageSize={this.pageSize} country="in" category="sports" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
          <Route exact path='/technology' element={<News  key="technology" pageSize={this.pageSize} country="in" category="technology" apikey="dcf9895aecd442338e81ed8555e3d8b8"/>}/>
        </Routes>
      </Router>
    )
  }
}

{/* <div>
        <Navbar/>
        <News pageSize={this.pageSize} country="in" category="general"/>
      </div> */}