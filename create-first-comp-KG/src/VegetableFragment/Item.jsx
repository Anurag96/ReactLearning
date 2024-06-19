import React from 'react'

function Item({ value }) {
    return (
        <>
            <li key={value} className="list-group-item">{value}</li>
        </>
    )
}

export default Item
