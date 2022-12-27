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
  pageSize = 6;
  apikey="dcf9895aecd442338e81ed8555e3d8b8"
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<News key="general" pageSize={this.pageSize} country="in" category="general" apikey={this.apikey}/>} />
          <Route exact path='/general' element={<News key="general" pageSize={this.pageSize} country="in" category="general" apikey={this.apikey}/>} />
          <Route exact path='/business' element={<News key="business" pageSize={this.pageSize} country="in" category="business" apikey={this.apikey}/>} />
          <Route exact path='/entertainment' element={<News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" apikey={this.apikey}/>} />
          <Route exact path='/health' element={<News key="health" pageSize={this.pageSize} country="in" category="health" apikey={this.apikey}/>} />
          <Route exact path='/science' element={<News key="science" pageSize={this.pageSize} country="in" category="science" apikey={this.apikey}/>} />
          <Route exact path='/sports' element={<News key="sports" pageSize={this.pageSize} country="in" category="sports" apikey={this.apikey}/>} />
          <Route exact path='/technology' element={<News key="technology" pageSize={this.pageSize} country="in" category="technology" apikey={this.apikey}/>} />
        </Routes>
      </Router>
    )
  }
}

