import React from 'react'
import './Calculator.css'
import Display from './Display'
import ButtonContainer from './ButtonContainer'
function Calculator() {

    return (
        <div>
            <h3 className='my-2'>Calculator</h3>
            <div className="calculator" >
                <Display />
                <ButtonContainer />
            </div>
        </div>
    )
}

export default Calculator