import React from "react";
import "../App.css";
import { useState } from "react";
import { useEffect } from "react";
import meeticon from "./logos/video-camera.png";
import CreateMeet from "./CreateMeet";
const {host} = require("../env.js");
const EventsMeet = (props) => {
  //const host = "http://localhost:5000";
  const authtoken = localStorage.getItem("token");
  const [meetings, setMeetings] = useState([]);
  const [showcreatemeet, setShowcreatemeet] = useState(false);
  useEffect(() => {
    if (authtoken) {
      fetchMeetings();
    }
    // eslint-disable-next-line
  }, [authtoken]);
  const fetchMeetings = async () => {
    const event_id = props.event._id;
    const response = await fetch(`${host}/api/meet/getallmeets/${event_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    setMeetings(json);
    //console.log(json);
  };
  return (
    <>
      <div
        className="groupname"
        style={
          props.darkTheme === "DarkTheme" ? { backgroundColor: "#202c33" } : {}
        }
      >
        <h1
          style={{
            fontSize: "30px",
            marginBottom: "0rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "48vh",
          }}
        >
          {props.event.title}
        </h1>
        <button
          className="meetbtn"
          onClick={() => {
            setShowcreatemeet(!showcreatemeet);
          }}
          style={
            props.darkTheme === "DarkTheme"
              ? { filter: "invert(100%)", backgroundColor: "#393c4b" }
              : { filter: "invert(0%)" }
          }
        >
          <img
            src={meeticon}
            className="eventicons"
            alt=""
            style={
              props.darkTheme === "DarkTheme"
                ? { filter: "invert(100%)", width: "35px" }
                : { filter: "invert(0%)", width: "35px" }
            }
          />
          <p style={{ marginBottom: "0rem" }}> New Meet</p>
        </button>
      </div>
      {showcreatemeet && <CreateMeet event={props.event} />}
      {!showcreatemeet && (
        <div className="meetings">
          <div className="meetingslist">
            {meetings.length === 0 && (
              <h3
                style={
                  props.darkTheme === "DarkTheme"
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                No Meets Created
              </h3>
            )}
            {meetings.map((meeting) => {
              return (
                <div
                  className={`meeting ${
                    props.darkTheme === "DarkTheme" ? "meetingDark" : ""
                  }`}
                >
                  <h4>{meeting.title}</h4>
                  <p>Event : {meeting.event_name}</p>
                  <p>
                    <a href={meeting.meet_link}>Meet Link </a>:{" "}
                    <span className="meetspan">{meeting.meet_link}</span>
                  </p>
                  <div className="dtrow">
                    <p>Date : {meeting.meet_date}</p>
                    <p>Time : {meeting.meet_time}</p>
                  </div>
                  <p>Meet Duration : {meeting.meet_duration} </p>
                  <div className="joinersRow">
                    <p style={{ fontStyle: "italic" }}>
                      Created by {meeting.creator.name}
                    </p>
                    <p>{meeting.participants.length} Participant(s)</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsMeet;
