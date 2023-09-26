import React from 'react'
import { TodoItem } from './TodoItem'

const Todos = ({todos,onDelete}) => {
  let myStyle={
    minHeight:"56vh"
  }
  return (
    <div className='container' style={myStyle}>
      <h3 className='my-3'>Todos List</h3>
      {todos.length === 0 ? "No Todos to display" :
        todos.map((todo) => {
          return (
          <>
          <TodoItem key={todo.sno} todo={todo} onDelete={onDelete} /><hr/>
          </>
          )
        })
      }

    </div>
  )
}

export default Todos