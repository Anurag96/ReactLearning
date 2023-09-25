import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import Todos from './components/Todos'

function App() {
  let todos = [
    {
      sno:1,
      title:"DO workout",
      desc:"Go need to gym"
    },
    {
      sno:2,
      title:"DO Shopping",
      desc:"Go need to shop"
    },
    {
      sno:3,
      title:"DO WOrk",
      desc:"Go need to office"
    }
  ]
  return (
    <div>
      <Navbar title="Todo-List" searchBar={false}/>
      <Todos todos={todos}/>
      <Footer/>
    </div>
  )
}

export default App

