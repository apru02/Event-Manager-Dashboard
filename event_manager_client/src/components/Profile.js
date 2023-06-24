import React from "react";
import "../App.css";
import UserNav from "./UserNav";
import Calendar from "./Calendar";
import plus from "./logos/plus (1).png";
import NewEventForm from "./NewEventForm";
import { useState } from "react"; 
const Profile = () => {
  
  const [showForm, setShowForm] = useState(false);
  const handlebtnclick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="part2">
      <UserNav />
      <hr />
      {!showForm && <Calendar />}
      {showForm && <NewEventForm handlebtnclick={handlebtnclick} />}
      {!showForm && (
        <div className="newEventBtn">
          <button className="newBtn" onClick={handlebtnclick}>
            <span>
              <img src={plus} alt="" width="28px" />
            </span>
            Create New Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
