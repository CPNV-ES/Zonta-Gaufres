import React from 'react'

const Draggarble = ({ children, onDragStart, draggarble = true }) => {
    return (
        <div
            onDragStart={(event) => onDragStart(event)}
            draggable={draggarble}>
            {children}
        </div>
    )
}

export default Draggarble
