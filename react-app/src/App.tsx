import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ListGroup from './components/ListGroup'
import Alert from './components/Alert'
import Button from './components/Button'

function App() {
  const [placeList, setPlaceList] = useState(['New York', 'Paris', 'London', 'Tokoyo'])
  const handleSelection = (item: string) => { console.log(item) }
  const [alert, setAlert] = useState(true)
  const [message, setMessage] = useState('Hello Anurag')
  const handleClick = () => {
    setAlert(false)
  }
  const handleReset = () => {
    setAlert(true)
  }
  return (
    <div>
      <ListGroup heading='Cities' placeList={placeList} onSelectItem={handleSelection} /> <br />

      {
        alert && <Alert text={message} />
      }
      <Button color='primary' onClick={handleClick} /><br />

      <button className='btn btn-primary' onClick={handleReset}>Reset</button>
    </div>
  )
}

export default App
