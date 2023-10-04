import React, { useState, useEffect } from 'react'
import Todos from './Todos'
import AddTodo from './AddTodo'

export default function TodoHome() {
    let initTodo;
    if (localStorage.getItem("todos") === null) {
      initTodo = [];
    } else {
      initTodo = JSON.parse(localStorage.getItem('todos'));
    }
    const [todos, setTodos] = useState(initTodo)
    
    const onDelete = (todo) => {
      // console.log('Delete',todo)
      setTodos(todos.filter((e) => {
        // console.log("Deleted",e)
        return e !== todo;
      }))
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  
    const addTodo = (title, desc) => {
      // console.log("Adding the details",title,desc);
      // let sno =  todos[todos.length-1].sno+1
      let sno = todos.length == 0 ? 1 : todos[todos.length - 1].sno + 1
  
      const myTodo = {
        sno: sno,
        title: title,
        desc: desc
      }
      setTodos([...todos, myTodo])
    }
  
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
  return (
    <>
    <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
    </>
  )
}
