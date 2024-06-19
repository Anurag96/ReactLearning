import { useState } from 'react'
import './App.css'
import AppName from './component/AppName'
import AddTodo from './component/AddTodo'
import TodoItem1 from './component/TodoItem1'

function App() {
  const [count, setCount] = useState(0)
  const [todoItems, setTodoItems] = useState([
    {
      todoName: 'milk',
      todoDate: '10/10/2024'
    },
    {
      todoName: 'Go to College',
      todoDate: '11/10/2024'
    }
  ])
  return (
    <>
      <center className='todo-container'>
        <AppName />
        <AddTodo />
        <TodoItem1 todoItems={todoItems} />
      </center>

    </>
  )
}

export default App
