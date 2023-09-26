import React from 'react'

export default function AddTodo() {
  return (
    <div className='container my-3'>
        <h3>Add a Todo</h3>
        <form>
  <div className="mb-3">
    <label htmlFor="title">Todo Title</label>
    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="mb-3">
    <label htmlFor="desc">Todo Description</label>
    <input type="text" className="form-control" id="desc" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-sm btn-primary">Add Todo</button>
</form>
    </div>
  )
}
