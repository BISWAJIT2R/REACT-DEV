import React from 'react'

export default function Button({ShowMore,  message, ShowLess}) {
  return (
    <div className="load-btn">
      <button className='btn' onClick={ShowMore}>+</button>
      <button className='btn' onClick={ShowLess}>-</button>
    </div>
  )
}
