import React from 'react'
import './Select.css'

const Select = ({name, value, className, onChange, placeholder, required, lable, children}) => {
  return (
    <div className='form-input-wraper'>
        {lable && <label htmlFor="">{lable}</label>}
        <select className={`${className}`} onChange={onChange} name={name} value={value} placeholder={placeholder} required={required} >
          {children}
        </select>
        
    </div>
  )
}

export default Select