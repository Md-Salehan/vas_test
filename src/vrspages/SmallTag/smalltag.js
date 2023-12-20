import React from 'react'
import './smalltag.css';


function smalltag({lable, bgColor, fontAwsmIcon, fontColor, iconColor, deleteFunc, handleClick}) {
  return (
    <div onClick={handleClick} className='tags-box' style={{backgroundColor: bgColor}}>
        {deleteFunc && <i className="fa-regular fa-trash-can del-icon" onClick={deleteFunc}></i>}
        <i style={fontAwsmIcon?{color: iconColor}:{display: "none"}} className={fontAwsmIcon+" icon"}></i>
        <p style={{color: fontColor}}>{lable}</p>
    </div>
  )
}

export default smalltag