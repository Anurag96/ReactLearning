import React, { useState } from 'react'

export default function TextForm(props) {

    const [text,setText] = useState(' ')

    const handleonChange = (event)=>{
        setText(event.target.value)
    }

    const changeUpperCase =()=>{
      let newText = text.toUpperCase()
        setText(newText)
    }

    const changeLowerCase = ()=>{
    setText(text.toLowerCase())
    }
    
    const clearText = ()=>{
        setText('')
    }


  return (
    <>
       <div className='container my-3' style={{color:props.mode==='dark'?'white':'#042743'}} >
        <h2>{props.heading}</h2>
        <div className="mb-3">
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="6"  value={text} onChange={handleonChange} style={{backgroundColor:props.mode==='light'?'white':'grey',color:props.mode==='dark'?'white':'#042743'}}></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-2" onClick={changeUpperCase}>UPPERCASE</button>
        <button  disabled={text.length===0} className="btn btn-primary mx-2" onClick={changeLowerCase}>LOWERCASE</button>
        <button  disabled={text.length===0} className="btn btn-primary mx-2" onClick={clearText}>CLEAR</button>
    </div>
    <div className="container my-3" style={{color:props.mode==='dark'?'white':'#042743'}}>
        <h1>Your Text Summary</h1>
        <p>{text.split(/\s+/).filter((ele)=>{return ele.length!==0}).length} Words, {text.length} Characters</p>
        <p>{text.split(/\s+/).filter((ele)=>{return ele.length!==0}).length*0.008} minutes to read.</p>
    </div>
    <div className="container" style={{color:props.mode==='dark'?'white':'#042743'}}>
        <h2>Preview Your text</h2>
        <p>{text.length===0?'Nothing to Preview':text}</p>
    </div>
    </>
  )
}
