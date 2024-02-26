import React from 'react'
import { Box } from './Box'
export default function Preview({toggler, url}) {
  return (
    <div className='preview-box2'>
      <button className='pre-btn' onClick={() => toggler()}>X</button>
      <div className="top-box">
           <div className="box">
           
           </div>
      </div>
      <div className="bottom-box2">
        <Box/>
      </div>
    </div>
  )
}
