import React from 'react'

function ButtonContainer() {
    const buttonNumber = ["C", 1, 2, "+", 3, 4, "-", 5, 6, "/", 7, 8, , "*", "=", 9, 0, "."]
    return (
        <div className='buttons-container'>
            {buttonNumber.map((value) => (
                <button className='button'>{value}</button>
            ))}

        </div>
    )
}

export default ButtonContainer
