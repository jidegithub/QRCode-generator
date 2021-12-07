import React from 'react'

type selectProps = {
  options: string[],
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  name: string
}

export default function SelectInput({options, onSelect, name}: selectProps) {
  return (
    <div>
      <select name={name} onChange={onSelect} className="custom-select">
        <option defaultValue="none" disabled>select one</option>
        {options.map((value, key) => (
          <option value={value} key={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
