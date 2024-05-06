import React from 'react'

const Draggable = ({ children, onDragStart, onDragEnd, draggable = true }) => {
    return (
        <div
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            draggable={draggable}>
            {children}
        </div>
    )
}

export default Draggable
