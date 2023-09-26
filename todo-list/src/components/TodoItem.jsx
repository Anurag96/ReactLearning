import React from 'react'

export const TodoItem = ({todo,onDelete}) => {
  return (
    <div>
      <h4 className='my-2'>{todo.sno}. {todo.title}</h4>
      <p>{todo.desc}</p>
      <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
    </div>
  )
}