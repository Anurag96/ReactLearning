import React from 'react'

function ErrorMessage(props) {
    return (
        <div>

            {props.foodItems.length === 0 ? `I'm Hungry` : ''}
            {/* {foodItems.length === 0 && `I'm Hungry`} */}
        </div>
    )
}

export default ErrorMessage
