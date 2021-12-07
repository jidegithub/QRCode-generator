import React from 'react'

type TextInputProps = {
  value: string
  placeholder?: string
  name: string
  type?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({value, placeholder='type here', name, onChange, type='text'}: TextInputProps) {

  return (
    <div>
      <input name={name} type={type} className='form-control' value={value} placeholder={placeholder} onChange={onChange}/>
      <h1>{value !== '' ? value + ": " : ''}</h1>
    </div>
  )
}
