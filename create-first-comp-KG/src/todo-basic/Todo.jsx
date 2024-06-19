import React from 'react'
import AppName from './AppName'
import AddTodo from './AddTodo'
import TodoItem1 from './TodoItem1'

function Todo() {
    return (
        <div>
            <center className='todo-container'>
                <AppName />
                <AddTodo />
                <div className="item-container">
                    <TodoItem1 />
                </div>
            </center>
        </div>
    )
}

export default Todo
