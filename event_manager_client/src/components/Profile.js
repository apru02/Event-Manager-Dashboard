import React from "react";
import "../App.css";
import UserNav from "./UserNav";
import Calendar from "./Calendar";
import plus from "./logos/plus (1).png";
import NewEventForm from "./NewEventForm";
import { useState } from "react";
import Chat from "./Chat";
import Meetings from "./Meetings";
import EventsMeet from "./EventsMeet";
const Profile = (props) => {
  const [showForm, setShowForm] = useState(false);
  
  const handlebtnclick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="part2">
      <UserNav handlemeetclick={props.handlemeetclick} />
      <hr />
      {props.showMeets && (
        <Meetings handlemeetclick={props.handlemeetclick}/>
      )

        }
      {props.showEventMeet && (<EventsMeet event = {props.currentEvent}/>)}
      {props.showchat  ? (
        <Chat event={props.currentEvent} />
      ) : (
        <>
          {showForm && !props.showMeets && !props.showEventMeet && <NewEventForm handlebtnclick={handlebtnclick}  />}
          {!showForm && !props.showMeets && !props.showEventMeet && <Calendar />}
          {!showForm && !props.showMeets && !props.showEventMeet && (
            <div className="newEventBtn">
              <button className="newBtn" onClick={handlebtnclick}>
                <span>
                  <img src={plus} alt="" width="28px" />
                </span>
                Create New Event
              </button>
            </div>
          )}
        </>
      )}
      
    </div>
  );
};

export default Profile;
