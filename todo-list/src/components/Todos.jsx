import React from 'react'
import { TodoItem } from './TodoItem'

const Todos = (props) => {
  return (
    <div className='container'>
      <h3 className='my-3'>Todos List</h3>
      {props.todos.length === 0 ? "No Todos to display" :
        props.todos.map((todo) => {
          return (<TodoItem key={todo.sno} todo={todo} onDelete={props.onDelete} />)
        })
      }

    </div>
  )
}

export default Todos