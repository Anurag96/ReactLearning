import React from 'react'
import Item from './Item'

function FoodItems(props) {
    return (
        <div>
            <ul className="list-group">
                {Object.values(props.foodItems).map((value) => (
                    <Item value={value} />
                ))}

            </ul>
        </div>
    )
}

export default FoodItems
