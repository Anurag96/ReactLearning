import React from 'react'

function AddTodo() {
    return (
        <div>
            <div class="container text-center">
                <div class="row">
                    <div class="col-6">
                        <input type='text' placeholder='Enter Todo her' />
                    </div>
                    <div class="col-4">
                        <input type='date' />
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn btn-success">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTodo
