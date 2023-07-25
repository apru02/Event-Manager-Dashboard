import React, { useState } from "react";
import "../App.css";
const {host} = require("../env.js");
const CreateMeet = (props) => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDuration, setMeetingDuration] = useState("00:00");
  const [meetingLink, setMeetingLink] = useState("");
  const convertMeetingDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  
  
  const meetingDurationToString = () => {
    const [hours, minutes] = meetingDuration.split(':');

    if (hours === '00' && minutes === '00') {
      return '0 mins';
    } else if (hours === '00') {
      return `${parseInt(minutes)} mins`;
    } else if (minutes === '00') {
      return `${parseInt(hours)} hrs`;
    } else {
      return `${parseInt(hours)} hrs ${parseInt(minutes)} mins`;
    }
  };
  const createNewMeeting = async () => {
    const meetduration = meetingDurationToString(meetingDuration);
    const meetDate = convertMeetingDate(meetingDate);
    const event_id = props.event._id;
    const response = await fetch(`${host}/api/meet/addmeeting/${event_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: meetingTitle,
        meet_date: meetDate,
        meet_time: meetingTime,
        meet_duration: meetduration,
        meet_link: meetingLink,
      }),
    });
    const json = await response.json();
    console.log(json);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewMeeting();
    setMeetingTitle("");
    setMeetingDate("");
    setMeetingTime("");
    setMeetingDuration("00:00");
    setMeetingLink("");
  };
  const handletitlechange = (event) => {
    const { value } = event.target;
    setMeetingTitle(value);
    };
    const handledatechange = (event) => {
    const { value } = event.target;
    setMeetingDate(value);
    };
    const handletimechange = (event) => {
    const { value } = event.target;
    setMeetingTime(value);
    };
    const handlelinkchange = (event) => {
    const { value } = event.target;
    setMeetingLink(value);
    };

  const handleDurationChange = (event) => {
    const { value } = event.target;

    // Restrict scrolling above "00"
    if (value.startsWith("-")) {
      event.target.value = "00:00";
      setMeetingDuration("00:00");
      return;
    }

    // Restrict scrolling above "59"
    const [hours, minutes] = value.split(":");
    if (parseInt(hours) >= 0 && parseInt(minutes) > 59) {
      event.target.value = `${hours}:59`;
      setMeetingDuration(`${hours}:59`);
      return;
    }

    setMeetingDuration(value);
  };
  return (
    <div className="createmeet">
      <h1>Create a meeting</h1>
      <div className="meetingcontent">
        <form className="meetform">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Meeting Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter title"
                value={meetingTitle}
                onChange={handletitlechange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Meeting Date</label>
            <input
              type="date"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter date"
                value={meetingDate}
                onChange={handledatechange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Meeting Time</label>
            <input
              type="time"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter time"
                value={meetingTime}
                onChange={handletimechange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Meeting Duration</label>
            <input
              type="time"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter duration"
              value={meetingDuration}
              onChange={handleDurationChange}
              max="10:00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Meeting Link</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter link"
                value={meetingLink}
                onChange={handlelinkchange}

            />
          </div>
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeet;



