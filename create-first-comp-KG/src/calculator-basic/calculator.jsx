import React from 'react'
import './Calculator.css'
function Calculator() {
    return (
        <div>
            <h3 className='my-2'>Calculator</h3>
            <div className="calculator" >
                <input type="text" className='display' />
                <div className='buttons-container'>
                    <button className='button'>C</button>
                    <button className='button'>1</button>
                    <button className='button'>2</button>
                    <button className='button'>3</button>
                    <button className='button'>4</button>
                    <button className='button'>5</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator