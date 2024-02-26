import React from 'react'
import Button from './Button'
// import Download from './Download';
export  function Box({images, ShowMore, download, refe, ShowLess, preView}) {
 
  return (
    <div className="main-box">
      <ul className='box' ref={refe}>
       {
        images.map((urls, i) => <Card key={i} url={urls} download={download} preView={preView}/>)
       }
    </ul>
    <Button message="Show More" ShowMore={ShowMore} ShowLess={ShowLess}/>
    </div>
    
  )
}

export function Card ({url, download, preView}) {
    return (
      <li className="card">
        <img src={url} alt="" onClick={() => preView(url)}/>
        <div className="hover-box">
          <div className="top-box">
            <div className="love size">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="add size">
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          <div className="bottom-box">
            <div className="info">
              <i className="fa-solid fa-camera"></i>
              <p className="txt"></p>
            </div>
            <div className="download-icon-box size" onClick={() => download(url)}>
            
                <i className="fa-solid fa-arrow-down download"></i>
              
            </div>
          </div>
        </div>
      </li>
    );
}

