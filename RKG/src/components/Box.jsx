import React from 'react'

export  function Box({images}) {
  return (
    <ul className='box'>
       {
        images.map((urls, i) => <Card key={i} url={urls}/>)
       }
    </ul>
  )
}

export function Card ({url}) {
    return (
        <div className='card'>
          <img src={url} alt="" />
          <div className="hover-box">
            
          </div>
        </div>
    )
}

