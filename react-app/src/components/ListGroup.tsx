import React, { useState, MouseEvent } from 'react'
interface Props {
    heading: string;
    placeList: string[];
    onSelectItem: (item: string) => void
}
export default function ListGroup(props: Props) {

    let [selectedIndex, setSelectedIndex] = useState(-1)

    return (
        <div>
            <h1>{props.heading}</h1>
            {props.placeList.length === 0 && 'No item found'}
            {
                props.placeList.map((e, index) => (
                    <ul key={e} className="list-group">
                        <li className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
                            onClick={
                                () => {
                                    // console.log('clicked', e, index)
                                    setSelectedIndex(index)
                                    props.onSelectItem(e)
                                }
                            }
                        >{e}
                        </li>
                    </ul>
                ))
            }

        </div>
    )
}
