import React, { useState, useEffect } from "react";
import "../App.css";
import tagicon from "./logos/tag.png";
import backicon from "./logos/back.png";
import groupicon from "./logos/group.png";
import eventContext from "../Context/EventContext";
import { useContext } from "react";
const {host} = require("../env.js");
//import { useNavigate } from "react-router-dom";
const NewEventForm = (props) => {
  const context = useContext(eventContext);
  const { addEvent, getEvents } = context;
  const [tags, setTags] = useState([]);
  const maxTags = 10;
  const [collaborators, setCollaborators] = useState([]);
  const [currCollaborator, setCurrCollaborator] = useState("");
  const [promptdisplay, setPromptDisplay] = useState("");
  const [lastcollaborator, setLastCollaborator] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const userSearchPrompt = async () => {
    const response = await fetch(
      `${host}/api/auth/searchuser/${currCollaborator}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      setPromptDisplay(json.users.name);
      setLastCollaborator(json.users);
    } else {
      setPromptDisplay("");
    }
  };
  const oncollabchange = (e) => {
    setCurrCollaborator(e.target.value);
    userSearchPrompt();
  };
  const handleuserinput = () => {
    if (
      lastcollaborator &&
      !collaborators.some((c) => c._id === lastcollaborator._id)
    ) {
      setCollaborators((prevCollaborators) => [
        ...prevCollaborators,
        lastcollaborator,
      ]);
    }
  };

  const removeUserTag = (id) => {
    const updatedCollaborators = collaborators.filter((c) => c._id !== id);
    setCollaborators(updatedCollaborators);
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

  const removeTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };
  const removeAllCollabs = () => {
    setCollaborators([]);
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
    //console.log(collaborators);
    if (eventDetails.title === "" || eventDetails.description === "") {
      props.setShowAlert1(true);
      props.setMessage1("Please fill all the fields");
      props.setType1("warning");
      setTimeout(() => {
        props.setShowAlert1(false);
      }, 2000);
      return;
    } else {
      if (isChecked) {
        addEvent(
          eventDetails.title,
          eventDetails.description,
          tags,
          eventDetails.eventStartDate,
          eventDetails.eventEndDate,
          collaborators
        );
        props.handlebtnclick();
      } else {
        props.setShowAlert1(true);
        props.setMessage1("Please ensure that you are an admin ");
        props.setType1("warning");
        setTimeout(() => {
          props.setShowAlert1(false);
        }, 2000);
      }

      getEvents();
    }

    //window.location.reload();
  };

  return (
    <div className="neweventform">
      <img
        src={backicon}
        className="backIcon"
        onClick={props.handlebtnclick}
        alt="back"
        style={
          props.darkTheme === "DarkTheme"
            ? { filter: "invert(1)" }
            : { filter: "invert(0)" }
        }
      />
      <h2 style={{ paddingLeft: "28px" }}>Create New event</h2>
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
            style={
              props.darkTheme === "DarkTheme"
                ? { backgroundColor: "#313131", color: "white" }
                : { backgroundColor: "white", color: "black" }
            }
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
            style={
              props.darkTheme === "DarkTheme"
                ? { backgroundColor: "#313131", color: "white" }
                : { backgroundColor: "white", color: "black" }
            }
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
            onChange={(e) => {
              if (
                eventDetails.eventEndDate !== "" &&
                e.target.value > eventDetails.eventEndDate
              ) {
                props.setShowAlert1(true);
                props.setMessage1("Start date cannot be greater than end date");
                props.setType1("warning");
                setTimeout(() => {
                  props.setShowAlert1(false);
                }, 2000);
                e.target.value = eventDetails.eventStartDate;
                return;
              } else {
                onchange(e);
              }
            }}
            style={
              props.darkTheme === "DarkTheme"
                ? { backgroundColor: "#313131", color: "white" }
                : { backgroundColor: "white", color: "black" }
            }
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
            onChange={(e) => {
              if (
                eventDetails.eventStartDate !== "" &&
                e.target.value < eventDetails.eventStartDate
              ) {
                props.setShowAlert1(true);
                props.setMessage1("End date cannot be less than start date");
                props.setType1("warning");
                setTimeout(() => {
                  props.setShowAlert1(false);
                }, 2000);
                e.target.value = eventDetails.eventEndDate;
                return;
              } else {
                onchange(e);
              }
            }}
            style={
              props.darkTheme === "DarkTheme"
                ? { backgroundColor: "#313131", color: "white" }
                : { backgroundColor: "white", color: "black" }
            }
          />
        </div>
        <div
          className={`wrapper`}
          style={
            props.darkTheme === "DarkTheme"
              ? { backgroundColor: "rgb(57 57 57)" }
              : {}
          }
        >
          <div className="title">
            <img
              src={tagicon}
              style={
                props.darkTheme === "DarkTheme"
                  ? { filter: "invert(1)", width: "30px" }
                  : { filter: "invert(0)", width: "30px" }
              }
              alt="icon"
            />
            <h2>Tags</h2>
          </div>
          <div className="content">
            <p>Press enter or add a comma after each tag</p>
            {tags.length > 0 ? <ul>{createTag()}</ul> : " "}

            <input
              type="text"
              spellCheck="false"
              onKeyUp={addTag}
              style={
                props.darkTheme === "DarkTheme"
                  ? { backgroundColor: "#313131", color: "white" }
                  : { backgroundColor: "white", color: "black" }
              }
            />
          </div>
          <div className="details">
            <p>
              <span>{countTags()}</span> tags are remaining
            </p>
            <button onClick={removeAllTags}>Remove All</button>
          </div>
        </div>
        <div
          className={`wrapper`}
          style={
            props.darkTheme === "DarkTheme"
              ? { backgroundColor: "rgb(57 57 57)" }
              : {}
          }
        >
          <div className="title">
            <img
              src={groupicon}
              style={
                props.darkTheme === "DarkTheme"
                  ? { filter: "invert(1)", width: "30px" }
                  : { filter: "invert(0)", width: "30px" }
              }
              alt="icon"
            />
            <h2>Add Collaborators</h2>
          </div>
          <div className="content">
            <p>Enter the username of the person to be added as collaborator</p>
            {collaborators.length > 0 ? (
              <ul>
                {collaborators.map((collaborator) => {
                  return (
                    <li key={collaborator._id}>
                      {collaborator.name}{" "}
                      <i
                        className="uit uit-multiply"
                        onClick={() => removeUserTag(collaborator._id)}
                      ></i>
                    </li>
                  );
                })}
              </ul>
            ) : (
              " "
            )}

            <div className="collabinput">
              <input
                type="text"
                spellCheck="false"
                onChange={oncollabchange}
                style={
                  props.darkTheme === "DarkTheme"
                    ? { backgroundColor: "#313131", color: "white" }
                    : { backgroundColor: "white", color: "black" }
                }
              />

              {promptdisplay !== "" ? (
                <li
                  style={{ padding: "3px 5px 3px 10px", cursor: "pointer" }}
                  onClick={handleuserinput}
                >
                  {promptdisplay}
                </li>
              ) : (
                " "
              )}
            </div>
          </div>
          <div className="details">
            <button onClick={removeAllCollabs}>Remove All</button>
          </div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
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
