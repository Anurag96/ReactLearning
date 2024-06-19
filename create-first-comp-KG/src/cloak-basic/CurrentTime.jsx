import React from 'react'

function CurrentTime() {
    let time = new Date()
    return (
        <div>
            <h5 className='lead'>This is the current time : {time.toLocaleDateString()} - {time.toLocaleTimeString()}</h5>
        </div>
    )
}

export default CurrentTime
