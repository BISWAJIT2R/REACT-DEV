import React from 'react'

export  function Navbar({children}) {
  return (
    <nav className='nav-bar'>
      {children}
    </nav>
  )
}

export function Logo () {
    return (
        <div className='logo'>
            <span>❤️</span>
            <h1>RKG</h1>
        </div>
    )
}

export function SearchBox ({value, setQuery}) {
    return (
            <input type='text' placeholder='Search photos here...'  className='search-box' value={value} onChange={(e) => setQuery(e.target.value)}/>
    )
}

export function NumResults ({count}) {
    return (
        <span className='num-results'>Results {count} Found</span>
    )
}