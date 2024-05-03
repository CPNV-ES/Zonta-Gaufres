import React from 'react'

const Draggarble = ({ children, onDragStart, draggarble = true }) => {
    return (
        <div
            onDragStart={onDragStart}
            draggable={draggarble}>
            {children}
        </div>
    )
}

export default Draggarble
