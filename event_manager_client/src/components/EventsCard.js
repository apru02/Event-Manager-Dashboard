import React from "react";
import "../App.css";
import Tags from "./Tags";
import dp1 from "./logos/30.png";
import edit from "./logos/pencil-2.png";
const EventsCard = (props) => {
  return (
    <div className="card">
      <div className="firstRow">
        <p className="eventTitle" style={{ marginBottom: "0rem" }}>
          {props.title}
        </p>
        <label className="switch">
          <input type="checkbox" id="toggleSwitch" checked={props.isActive} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="dates">
        <p className="date" style={{ marginBottom: "0rem" }}>
         { `${props.startDate} - ${props.endDate}`}
        </p>
      </div>
      <div className="secondRow">
        {props.tags.map((tag) => (
          <Tags title={tag} />
        ))}
      </div>
      <div className="thirdRow">
        <div className="teamRow">
          <span className="dp">
            <img className="dp_element" src={dp1} alt="" width="48px" />
          </span>
          <span className="dp">
            <img className="dp_element" src={dp1} alt="" width="48px" />
          </span>
          <span className="numbers">
            {props.collaborators.length > 2
              ? props.collaborators.length - 2
              : ""}
          </span>
        </div>
        <span className="edit_btn">
          <img src={edit} alt="edit" width="40px" />
        </span>
      </div>
    </div>
  );
};

export default EventsCard;
