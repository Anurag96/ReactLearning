import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import Todos from './components/Todos'

function App() {
  const onDelete =(todo)=>{
    console.log('Deleted',todo)
  }
  let todos = [
    {
      sno:1,
      title:"Do workout",
      desc:"Go need to gym"
    },
    {
      sno:2,
      title:"Do Shopping",
      desc:"Go need to shop"
    },
    {
      sno:3,
      title:"Do Work",
      desc:"Go need to office"
    }
  ]
  return (
    <div>
      <Navbar title="Todo-List" searchBar={false}/>
      <Todos todos={todos} onDelete={onDelete}/>
      <Footer/>
    </div>
  )
}

export default App

