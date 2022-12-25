import React from 'react'

export default function About(props) {

    // const [myStyle,setMyStyle]= useState({
    //     color:'black',
    //     backgroundColor:'white'
    // })
    const myStyle = {
        color:props.mode==='dark'?'white':'black',
        backgroundColor:props.mode==='dark'?'#042743':'white'
    }
    const mainStyle = {
        color:props.mode==='dark'?'white':'black'
    }

    // const [btnTxt,setBtnTxt]=useState('Enable Dark Mode')

    // let toggleStyle =()=>{
    //    if(myStyle.color==='white'){
    //     setMyStyle({
    //         color:'black',
    //         backgroundColor:'white'
    //     })
    //     setBtnTxt('Enable Dark Mode')

    //    }else{
    //     setMyStyle({
    //         color:'white',
    //         backgroundColor:'black'
    //     })
    //     setBtnTxt('Enable Light Mode')
    //    }
    // }
   
    
  return (
    <div className='container' style={mainStyle}>
            <h1 className='my-3'>ABOUT US</h1>
            <div className="accordion" id="accordionExample" >
        <div className="accordion-item" >
            <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button"  type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <strong>Analyze your text</strong>
            </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle} >
            Textutils app gives you a way to analyze your text quicky and efficently. Be it word count, character count or changing to lower or upper case.
            </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <strong> Free to use</strong>
            </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
            Textutils is a free chracter count tools that provide instant chracter count statistics for a given text. Tecxtutils reports number of words and characters. This it is suitable for writing text with word/chracter limit. 
            </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <strong>Browser Compatibility</strong>
            </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
            This word counter software works in any web browser such as chrome, Firefox, Safari, Opera etc,. It suits to count chracters in facebook, blog, books, odf documents, essays etc.
            </div>
            </div>
        </div>
        </div>
        {/* <div className="container my-3">
            <button type='button' className="btn btn-primary my-3" onClick={toggleStyle}>{btnTxt}</button>
        </div> */}
    </div>
  )
}
