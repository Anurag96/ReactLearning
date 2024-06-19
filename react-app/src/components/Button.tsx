import React from 'react'

interface Props {
    color: string
    onClick: () => void
}
const Button = (props: Props) => {
    return (
        <div>
            <button type="button" className={'btn btn-' + props.color} onClick={props.onClick}>Hide the text</button>
        </div>
    )
}

export default Button
