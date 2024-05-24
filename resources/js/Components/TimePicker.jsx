import React, {useState} from 'react'

const TimePicker = ({onValidate}) => {
    const [time, setTime] = useState('18:00')
    const [isTimeValid, setIsTimeValid] = useState(true)

    const checkTime = (time) => {
        setTime(time)
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
        if (regex.test(time)) {
            setIsTimeValid(true)
        }
        else {
            setIsTimeValid(false)
        }
    }

    return (
        <div className="flex">
            <input 
            type="time" 
            id="time"
            className={`rounded-lg bg-gray-50 border text-gray-900  block flex-1 w-full text-sm p-2.5 outline-none ${isTimeValid? 'border-gray-300' : 'border-red-500'}`}            value={time}
            onChange={(e) => checkTime(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    onValidate();
                }
            }}
            required/>
        </div>
    )
}

export default TimePicker