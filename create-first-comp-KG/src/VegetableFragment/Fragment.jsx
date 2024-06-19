import React from 'react'
import FoodItems from './FoodItems'
import ErrorMessage from './ErrorMessage'

function Fragment() {
    const foodItems = [
        'Lentilis', 'Vegetable', 'Fruits', 'Milk', 'Rottis'
    ]
    return (
        <div>
            <h3> Healthy Food List</h3>
            <ErrorMessage foodItems={foodItems} />
            <FoodItems foodItems={foodItems} />
        </div>
    )
}

export default Fragment
