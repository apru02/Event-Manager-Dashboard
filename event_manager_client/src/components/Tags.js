import React from 'react'
import '../App.css'
const Tags = (props) => {
  return (
    <div className='tag' style={props.darkTheme==="DarkTheme"?{backgroundColor:"rgb(92 92 92 / 60%)"}:{}}>
        <p className='tagText' style={props.darkTheme==="DarkTheme"?{color:"#ff9900"}:{}}>{props.title}</p>
    </div>
  )
}

export default Tags
