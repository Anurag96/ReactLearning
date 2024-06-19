import { useState } from 'react'
import "./styles.css"
function App() {
  const [newItem, setNewItem] = useState('')
  const [todos, setTodos] = useState([])
  const addNewItem = () => {

  }
  const deleteItem = () => {


  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false }
      ]
    })

  }

  console.log('todos', todos)
  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input type='text' id='item' onChange={(e) => { setNewItem(e.target.value) }} />
        </div>
        <button className='btn' onClick={addNewItem}>Add</button>
      </form>

      <h2 className='header'>TodoLists</h2>
      <ul className='list'>
        {todos.map(todo => {
          return <li>
            <label>
              <input type="checkbox" />{todo}
            </label>
            <button className='btn btn-danger' onClick={deleteItem}>Delete</button>
          </li>
        }
        )}
      </ul>
    </>
  )
}

export default App
