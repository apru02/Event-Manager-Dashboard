import React, { useState, useEffect } from "react";
import "../App.css";
import tagicon from "./logos/tag.png";
import backicon from "./logos/back.png";
import eventContext from "../Context/EventContext";
import { useContext } from "react";
//import { useNavigate } from "react-router-dom";
const NewEventForm = (props) => {
  const context = useContext(eventContext);
  const { addEvent } = context;
  const [tags, setTags] = useState([]);
  const maxTags = 10;
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    eventStartDate: "",
    eventEndDate: "",
  });

  useEffect(() => {
    countTags();
    // eslint-disable-next-line
  }, [tags]);

  const onchange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const countTags = () => {
    const tagNumb = maxTags - tags.length;
    return tagNumb;
  };

  const createTag = () => {
    const reversedTags = [...tags].reverse();
    return reversedTags.map((tag, index) => (
      <li key={index}>
        {tag}{" "}
        <i className="uit uit-multiply" onClick={() => removeTag(tag)}></i>
      </li>
    ));
  };

  const removeTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let tag = e.target.value.replace(/\s+/g, " ");
      if (tag.length > 1 && !tags.includes(tag)) {
        if (tags.length < maxTags) {
          const updatedTags = [...tags, ...tag.split(",")];
          setTags(updatedTags.slice(0, maxTags));
        }
      }
      e.target.value = "";
    }
  };

  const removeAllTags = () => {
    setTags([]);
  };

  const handleFormSubmit = (e) => {
    // Perform any necessary form submission logic here
    e.preventDefault();
    addEvent(
        eventDetails.title,
        eventDetails.description,
        tags,
        eventDetails.eventStartDate,
        eventDetails.eventEndDate
    );

    console.log(tags);
  };

  return (
    <div className="neweventform">
      <img
        src={backicon}
        className="backIcon"
        onClick={props.handlebtnclick}
        alt="back"
      />
      <h2 style={{ paddingLeft: "15px" }}>Create New event</h2>
      <form className="createEvent" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Event Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={onchange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Event Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="description"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputStartDate" className="form-label">
            Event Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="inputStartDate"
            name="eventStartDate"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEndDate" className="form-label">
            Event End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="inputEndDate"
            name="eventEndDate"
            onChange={onchange}
          />
        </div>
        <div className="wrapper">
          <div className="title">
            <img src={tagicon} style={{ width: "30px" }} alt="icon" />
            <h2>Tags</h2>
          </div>
          <div className="content">
            <p>Press enter or add a comma after each tag</p>
            <ul>{createTag()}</ul>
            <input type="text" spellCheck="false" onKeyUp={addTag} />
          </div>
          <div className="details">
            <p>
              <span>{countTags()}</span> tags are remaining
            </p>
            <button onClick={removeAllTags}>Remove All</button>
          </div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            You are creating this event as an admin
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewEventForm;
