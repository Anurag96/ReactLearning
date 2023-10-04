import React, { useState } from 'react'

export default function AddTodo(props) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const submit = (e) => {
        e.preventDefault(e);
        if (!title || !desc) {
            alert("Title or Description is empty")
        }else{props.addTodo(title,desc)
        setTitle("")
        setDesc('')}
    }
    return (
        <div className='container my-3'>
            <h3>Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title">Todo Title</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter Title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc">Todo Description</label>
                    <input type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} className="form-control" id="desc" placeholder="Todo Description" />
                </div>
                <button type="submit" className="btn btn-sm btn-primary">Add Todo</button>
            </form>
        </div>
    )
}
