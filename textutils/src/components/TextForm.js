import React, {useState} from 'react'

export default function TextForm(props) {

    const handleUpCLick = ()=>{
        // console.log('Uppercase was clicked')
        setText((a)=>{
            return a.toUpperCase()
        })
        props.showAlert('Converted to Uppercase','success')
    }
    const handleLoCLick = ()=>{
        // console.log('LowerCase was clicked')
           setText((a)=>{
            return a.toLowerCase()
        })
        props.showAlert('Converted to Lowercase','success')
    }
    const handleReverseCLick = ()=>{
        // console.log('Reverse was clicked')
           setText((a)=>{
            return a.split('').reverse().join('')
        })
        props.showAlert('The text has been reversed','success')
    }
    const handleClearCLick = ()=>{
        // console.log('Clear was clicked')
           setText("")
           props.showAlert('The text has been cleared','success')
    }
    const handleSpaceCLick = ()=>{
        // console.log('Clear was clicked')
           setText(text. split(''). join(' ') )
           props.showAlert('The space has been applied','success')
    }
    const handleOnChange = (event)=>{
        // console.log('On Change')
        setText(event.target.value)
    }
      
  // Declare a new state variable, which we'll call "text"
  const [text, setText] = useState('');
return (


    <>
    <div className="container my-4" style={{color:props.mode==='dark'?'white':'#042743'}}>
    <h2>{props.heading}</h2>
    <div className="mb-3" >
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={text} onChange={handleOnChange} style={{backgroundColor:props.mode==='dark'?'grey':'white',color:props.mode==='dark'?'white':'#042743'}}></textarea>
    </div>  
    <div>
      <button className="btn btn-primary mx-2" onClick={handleUpCLick}>Convert to Uppercase</button>
      <button className="btn btn-primary mx-2" onClick={handleLoCLick}>Convert to Lowercase</button>
    <button className="btn btn-primary mx-2" onClick={handleReverseCLick}>Reverse All</button>
    <button className="btn btn-primary mx-2" onClick={handleClearCLick}>Clear Text</button>
    <button className="btn btn-primary mx-2" onClick={handleSpaceCLick}>Space up Text</button>
    </div>
    </div>
    <div className="container my-3" style={{color:props.mode==='dark'?'white':'#042743'}}>
        <h3>Your Text Summary</h3>
        <p>{text.split(' ').length} Words, {text.length} Characters</p>
        <p>{0.008*text.split(' ').length} minutes to read.</p>
        <h3>Preview</h3>
        <p>{text.length>0? text:'Enter the text for preview :)'}</p>
    </div>
    </>
)
}
