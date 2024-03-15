import React from "react";

const MySelect = ({ options, defaultValue, value, onChange, style }) => {
  return (
    <select style={style} value={value} onChange={e => onChange(e.target.value)}>
      {defaultValue && <option disabled value=''>{defaultValue}</option>}
      {options.map(option =>
        <option key={option.value} value={option.value}>{option.name}</option>
      )}
    </select>
  )
}

export default MySelect;