import React from 'react'
import FoodItems from './FoodItems'
import ErrorMessage from './ErrorMessage'
import Container from './Container'

function Fragment() {
    const foodItems = [
        'Lentilis', 'Vegetable', 'Fruits', 'Milk', 'Rottis'
    ]
    return (
        <Container>
            <h3> Healthy Food List</h3>
            <ErrorMessage foodItems={foodItems} />
            <FoodItems foodItems={foodItems} />
        </Container>
    )
}

export default Fragment
