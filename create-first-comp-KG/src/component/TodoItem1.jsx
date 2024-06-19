import React, { useState } from 'react'

function TodoItem1(props) {

    let todoName = "Buy Milk"
    let todoDate = "4/10/2024"
    return (
        <div>
            {/* {
                todoItems.map((data) => {
                    { data }
                    <div class="container text-center">
                        <div class="row">
                            <div class="col-6">
                                {data.todoName}
                            </div>
                            <div class="col-4">
                                {data.todoDate}
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                })
            } */}

            <div class="container text-center">
                <div class="row">
                    <div class="col-6">
                        {todoName}
                    </div>
                    <div class="col-4">
                        {todoDate}
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default TodoItem1
