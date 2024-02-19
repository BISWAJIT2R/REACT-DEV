import React from 'react'
const queryBox = ["Tree",  "Car", "asthetic",  "Anime"];
export  function SideNavbar({setQuery}) {
  return (
    <ul className='side-bar'>
      {
       queryBox.map((item, index) => 
        <li key={index} onClick={() => setQuery(item)}>{item}</li>
       )
      }
    </ul>
  )
}
