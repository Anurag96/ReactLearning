import React from 'react'
import { TodoItem } from './TodoItem'

 const Todos = (props) =>{
  return (
    <div className='container'>
      <h3>Todos List</h3>
        <TodoItem todos={props.todos[0]}/>
    </div>
  )
}

export default Todos