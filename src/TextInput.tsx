import React from 'react'

type TextInputProps = {
  value: string
  placeholder?: string
  name: string
  type?: string
  pattern?: string
  minLength?: number
  maxLength?: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({value, placeholder='type here', name, onChange, type='text', pattern, minLength, maxLength}: TextInputProps) {

  return (
    <div>
      <input name={name} type={type} className='form-control' value={value} minLength={minLength} maxLength={maxLength} pattern={pattern} placeholder={placeholder} onChange={onChange}/>
      <h1>{value !== '' ? value + ": " : ''}</h1>
    </div>
  )
}
