import { useState } from 'react'
import './App.css'
import AppName from './todo-basic/AppName'
import AddTodo from './todo-basic/AddTodo'
import TodoItem1 from './todo-basic/TodoItem1'

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
        <div className="item-container">
          <TodoItem1 todoItems={todoItems} />
        </div>
      </center>

    </>
  )
}

export default App
