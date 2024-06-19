import React from 'react'

function Fragment() {
    const foodItems = [
        'Lentilis', 'Vegetable', 'Fruits', 'Milk', 'Rottis'
    ]
    return (
        <div>
            <h3> Healthy Food List</h3>
            <ul class="list-group">
                {Object.values(foodItems).map((value) => (
                    <li class="list-group-item">{value}</li>
                ))}

            </ul>
            {/* <ul class="list-group">
                <li class="list-group-item">Lentilis</li>
                <li class="list-group-item">Vegetable</li>
                <li class="list-group-item">Fruits</li>
                <li class="list-group-item">Milk</li>
                <li class="list-group-item">Rottis</li>
            </ul> */}
        </div>
    )
}

export default Fragment
