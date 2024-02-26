import React from 'react'

export default function ErrorHandeler({message}) {
  return (
    <h1 className='error'>
      <span>⚠️</span>
      {message}
    </h1>
  )
}
