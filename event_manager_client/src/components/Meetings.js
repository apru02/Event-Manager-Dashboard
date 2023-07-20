import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import backicon from "./logos/back.png";
const Meetings = (props) => {
  const host = "http://localhost:5000";
  const authtoken = localStorage.getItem("token");
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    if (authtoken) {
      fetchMeetings();
    }
    // eslint-disable-next-line
  }, [authtoken]);
  const fetchMeetings = async () => {
    const response = await fetch(`${host}/api/meet/getallmeetings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    setMeetings(json);
    // console.log(json);
  };

  return (
    <div className="meetings">
      <img
        src={backicon}
        className="backicon"
        style={
          props.darkTheme === "DarkTheme"
            ? { filter: "invert(100%)", marginLeft: "-16px" }
            : { filter: "invert(0%)", marginLeft: "-16px" }
        }
        onClick={props.handlemeetclick}
        alt=""
      />
      <h1>Your Meetings</h1>
      <div className="meetingslist">
        {meetings.map((meeting) => {
          return (
            <div className={`meeting ${props.darkTheme === "DarkTheme" ? "meetingDark" : ""}`}>
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
  );
};

export default Meetings;
