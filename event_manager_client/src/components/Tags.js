import React from 'react'
import '../App.css'
const Tags = (props) => {
  return (
    <div className='tag'>
        <p className='tagText'>{props.title}</p>
    </div>
  )
}

export default Tags
