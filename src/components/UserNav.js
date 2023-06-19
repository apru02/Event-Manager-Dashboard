import React from 'react'
import message from "./logos/mail.png"
import notifications from "./logos/bell.png"
import dp from "./logos/asset-1.png"
const UserNav = () => {
  return (
    <nav className="navbar2">
    <span className="mailicon">
      <img src={message} alt="mail" width="36px" />
    </span>
    <span className="bellicon">
      <img src={notifications} alt="notis" width="36px" />
    </span>
    <span className="userName">Thomas Edwin</span>
    <span className="userdp"><img src={dp} alt="dp" width="65px" /></span>
  </nav>
  )
}

export default UserNav
