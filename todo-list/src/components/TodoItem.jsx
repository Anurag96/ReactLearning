import React from 'react'

export const TodoItem = (props) => {
  return (
    <div>
      <h4>{props.todos.title}</h4>
      <p>{props.todos.desc}</p>
    </div>
  )
}