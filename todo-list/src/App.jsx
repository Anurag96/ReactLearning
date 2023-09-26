import React,{useState} from 'react'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'

function App() {
  const [todos,setTodos] = useState([
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
  ])
  const onDelete =(todo)=>{
    // console.log('Delete',todo)
    setTodos(todos.filter((e)=>{
      // console.log("Deleted",e)
      return e!==todo;
    }))
  }
  const addTodo =(title,desc)=>{
      // console.log("Adding the details",title,desc);
      // let sno =  todos[todos.length-1].sno+1
      let sno =  todos.length==0 ? 1 : todos[todos.length-1].sno + 1
    
      const myTodo ={
        sno:sno,
        title:title,
        desc:desc
      }
      setTodos([...todos,myTodo])
  }

  return (
    <div>
      <Navbar title="Todo-List" searchBar={false}/>
      <AddTodo addTodo={addTodo}/>
      <Todos todos={todos} onDelete={onDelete}/>
      <Footer/>
    </div>
  )
}

export default App

