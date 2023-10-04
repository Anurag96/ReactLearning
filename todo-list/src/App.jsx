import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import TodoHome from './components/TodoHome'

function App() {

  
  return (
    <>
      <Navbar title="Todo-List" searchBar={false} />
      <TodoHome/>
      <Footer />
    </>
  )
}

export default App

