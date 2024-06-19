import React, { useState } from 'react'

function TodoItem1(props) {

    let todoName = "Buy Milk"
    let todoDate = "4/10/2024"
    let todoItems = [
        {
            todoName: 'Buy Milk',
            todoDate: "4/10/2024"
        },
        {
            todoName: 'Go to Gym',
            todoDate: "4/11/2024"
        }
    ]
    return (
        <div>
            {
                todoItems.map((data) => (
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                {data.todoName}
                            </div>
                            <div className="col-4">
                                {data.todoDate}
                            </div>
                            <div className="col-2">
                                <button type="button" className="btn btn-danger kg-button">Delete</button>
                            </div>
                        </div>
                    </div>
                )
                )
            }

            {/* <div className="container">
                <div className="row">
                    <div className="col-6">
                        {todoName}
                    </div>
                    <div className="col-4">
                        {todoDate}
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-danger kg-button">Delete</button>
                    </div>
                </div>
            </div> */}

        </div >
    )
}

export default TodoItem1
