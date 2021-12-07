import React, { useState } from 'react'

type TextInputProps = {
  value: string
}

export default function TextInput({value}: TextInputProps) {
  const [, setInput] = useState(value)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInput(value)
  }

  return (
    <div>
      <input type='text' className='form-control' value={value} placeholder='Write Here' onChange={handleChange}/>
      <h1>{value !== '' ? value + ": " : ''}</h1>
    </div>
  )
}
