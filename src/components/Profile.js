import React from 'react'
import '../App.css'
import UserNav from './UserNav'
import Calendar from './Calendar'
import plus from './logos/plus (1).png'
const Profile = () => {
  return (
    <div className="part2">
       <UserNav />
       <hr />
       <Calendar />
       <div className="newEventBtn">
        <button className='newBtn'>
               <span><img src={plus} alt="" width="28px" /></span>Create New Event
        </button>
       </div>
    </div>
  )
}

export default Profile
