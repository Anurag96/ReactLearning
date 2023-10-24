import React, { useState, MouseEvent } from 'react'

export default function ListGroup() {

    const [placeList, setPlaceList] = useState(['New York', 'Paris', 'London', 'Tokoyo'])
    let [selectedIndex, setSelectedIndex] = useState(-1)

    return (
        <div>
            <h1>List Group</h1>
            {placeList.length === 0 && 'No item found'}
            {
                placeList.map((e, index) => (
                    <ul className="list-group">
                        <li key={e} className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
                            onClick={
                                () => {
                                    // console.log('clicked', e, index)
                                    setSelectedIndex(index)
                                }
                            }>
                            {e}
                        </li>
                    </ul>
                ))
            }

        </div>
    )
}
