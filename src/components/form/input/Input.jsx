import React from 'react'
import './Input.css'

const Input = ({type='text', name='', value='', onChange, lable, placeholder, className, textarea = false, rows=10, required=false}) => {
  return (
    <div className='form-input-wraper'>
        {lable && <label htmlFor="">{lable}</label>}
        {!textarea ? 
          <input className={`${className}`} onChange={onChange} type={type} name={name} value={value} placeholder={placeholder} required={required} />
          :
          <textarea className={`${className}`} onChange={onchange} value={value} name={name} placeholder={placeholder} rows={rows} required={required} />
        }
    </div>
  )
}

export default Input