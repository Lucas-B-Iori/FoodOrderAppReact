import { useState } from "react"

export default function Input({ type, label, onInputChange, value, name }) {
    const [ didEdit, setDidEdit ] = useState(false)
    
    const isInputInvalid = value.trim() === "" && didEdit

    function handleChange(event) {
        onInputChange(name, event.target.value)
        setDidEdit(false)
    }

    function handleBlur() {
        setDidEdit(true)
    }

    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <input 
                name={name} 
                value={value} 
                type={type}
                onBlur={handleBlur} 
                onChange={handleChange}
            />
            <p className="invalid">{isInputInvalid ? `${label} Invalid` : ""}</p>
        </div>
    )
}