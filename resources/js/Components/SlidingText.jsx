import React from 'react'

const SlidingText = ({ text, duration = 4 }) => {

    function slide(container) {
        const containerSize = container.offsetWidth
        textsToSlide = Array.from(container.getElementsByClassName('slide'))
        textsToSlide.forEach((text) => {
            if (text.offsetWidth > containerSize) {
                text.style.animationName = "slide";
            }
        })
    }

    function stopSlide(container) {
        textsToSlide = Array.from(container.getElementsByClassName('slide'))
        textsToSlide.forEach((text) => {
            text.style.animationName = "";
        })
    };

return (
    <div
        className='slide-container-hover'
        onMouseEnter={(e) => slide(e)}
        onMouseLeave={(e) => stopSlide(e)}
    >
        <span className="slide animate-[4s_ease-in-out_infinite]">
            {/* style={`animationDuration:${duration}s`} */}
            {text}
        </span>
    </div>
)
}

export default SlidingText