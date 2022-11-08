import React, {useState} from 'react'

export default function TextForm(props) {

    const handleUpCLick = ()=>{
        console.log('Uppercase was clicked')
        // setText('You have clicked HandleUpClick')
        setText((a)=>{
            return a.toUpperCase()
        })
    }
    const handleOnChange = (event)=>{
        console.log('On Change')
        setText(event.target.value)
    }
  // Declare a new state variable, which we'll call "text"
  const [text, setText] = useState('Enter the text here');
return (
<div>
    <>
    <h2>{props.heading}</h2>
    <div className="mb-3">
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={text} onChange={handleOnChange}></textarea>
    </div>  
    <div>
      <button className="btn btn-primary" onClick={handleUpCLick}>Convert to Uppercase</button>
    </div>
    </>
</div>
)
}
