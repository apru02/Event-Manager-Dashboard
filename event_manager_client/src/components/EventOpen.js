import React, { useEffect, useState } from "react";
import backicon from "./logos/back.png";
import chaticon from "./logos/chat.png";
import addcollabicon from "./logos/add-group.png";
import editicon from "./logos/editDesc.png";
import tagicon from "./logos/price-tag.png";
import edit from "./logos/edit.png";
import addtaskicon from "./logos/to-do-list.png";
import meeticon from "./logos/video-camera.png";
import calendarIcon from "./logos/calendar.png";
import { useRef } from "react";
import "../App.css";
const {host} = require("../env.js");


const EventOpen = (props) => {
  //const host = "http://localhost:5000";
  const authtoken = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState(props.event.tasks);
  const [task_completed, setTask_completed] = useState(0);
  const [enableSave, setEnableSave] = useState(false);
  const [enableDelete, setEnableDelete] = useState(false);
  const [enableFinalExit, setEnableFinalExit] = useState(true);
  const [admin, setAdmin] = useState(props.event.admin);

  const [collaborators, setCollaborators] = useState(props.event.collaborators);
  const modalRef = useRef(null);
  const backbtn = useRef(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authtoken,
        },
      });
      const json = await response.json();
      //console.log(json);
      const user = {
        id: json._id,
        name: json.name,
        username: json.username,
        email: json.email,
        photo: json.photo,
      };
      setUser(user);
      if (user.id === props.event.admin) {
        setEnableDelete(true);
        // console.log(admin);
        // console.log(user.id);
      }
    };
    const completedtasks = () => {
      let count = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
          count++;
        }
      }
      setTask_completed(count);
    };
    
    const updatecollaborators = async () => {
      const response = await fetch(
        `${host}/api/event/updatecollaborators/${props.event._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      if (json.success) {
        setCollaborators(json.newCollaborators);
      }
    };


    if (authtoken) {
      fetchUser();
      completedtasks();
      updatecollaborators();
      if (user.id === props.event.admin && collaborators.length > 1) {
        setEnableFinalExit(false);
      }
    }
    // eslint-disable-next-line
  }, [authtoken, tasks]);

  const [showtitle, setShowtitle] = useState(false);
  const [showdesc, setShowdesc] = useState(false);
  const [showtags, setShowtags] = useState(false);
  const [showtasks, setShowtasks] = useState(false);
  const [showcollabs, setShowcollabs] = useState(false);
  const [showTaskrow, setShowTaskrow] = useState(true);
  const handleTitleClick = () => {
    if (user.id === props.event.admin) {
      setShowtitle(!showtitle);
    } else {
      props.setMessage1("Only Admin of the event can change the Title");
      props.setType1("danger");
      props.setShowAlert1(true);
      setTimeout(() => {
        props.setShowAlert1(false);
      }, 2000);
    }
  };
  const handleDescClick = () => {
    setShowdesc(!showdesc);
  };
  const handleTagClick = () => {
    setShowtags(!showtags);
  };
  const handleTasksClick = () => {
    setShowtasks(!showtasks);
  };
  const handleCollabsClick = () => {
    setShowcollabs(!showcollabs);
  };
  const [title, setTitle] = useState(props.event.title);
  const [description, setDescription] = useState(props.event.description);
  const [tags, setTags] = useState(props.event.tags);

  const [eventStartDate, setEventStartDate] = useState(
    props.event.eventStartDate
  );
  const [eventEndDate, setEventEndDate] = useState(props.event.eventEndDate);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setEnableSave(true);
  };
  const handleDescChange = (e) => {
    setDescription(e.target.value);
    setEnableSave(true);
  };
  const removeTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    setEnableSave(true);
  };
  const maxTags = 10;
  const createTag = () => {
    const reversedTags = [...tags].reverse();
    return reversedTags.map((tag, index) => (
      <li key={index}>
        {tag}{" "}
        <div
          className="cross"
          onClick={() => removeTag(tag)}
          aria-hidden="true"
        ></div>
      </li>
    ));
  };
  const addTag = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      let tag = e.target.value.replace(/\s+/g, " ");
      if (tag.length > 1 && !tags.includes(tag)) {
        if (tags.length < maxTags) {
          const updatedTags = [...tags, ...tag.split(",")];
          setTags(updatedTags.slice(0, maxTags));
        }
      }
      e.target.value = "";
      setEnableSave(true);
    }
  };
  const handletaskCheck = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t === task) {
        t.completed = !t.completed;
        if (t.completed === true) {
          setTask_completed(task_completed + 1);
        } else {
          setTask_completed(task_completed - 1);
        }
      }
      return t;
    });
    setTasks(updatedTasks);
    setEnableSave(true);
  };
  const handleTaskChange = (e, task) => {
    const updatedTasks = tasks.map((t) => {
      if (t === task) {
        t.description = e.target.value;
      }
      return t;
    });
    setTasks(updatedTasks);
    setEnableSave(true);
  };
  const handleAddtask = async (e) => {
    const taskDescription = e.target.value;
    if (taskDescription.length > 1) {
      const response = await fetch(
        `${host}/api/event/createtask/${props.event._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: taskDescription,
          }),
        }
      );
      const { res_task } = await response.json();
      const updatedTasks = [...tasks, res_task];
      setTasks(updatedTasks);
      setEnableSave(true);
    }
    e.target.value = "";
  };
  const [currCollaborator, setCurrCollaborator] = useState("");
  const [promptdisplay, setPromptDisplay] = useState("");
  const [currValidCollaborator, setCurrValidCollaborator] = useState({});
  const oncollabchange = (e) => {
    setCurrCollaborator(e.target.value);
    userSearchPrompt();
  };
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
      setCurrValidCollaborator(json.users);
    } else {
      setPromptDisplay("");
    }
  };
  const handleAddCollab = async (e) => {
    e.preventDefault();
    for (let i = 0; i < collaborators.length; i++) {
      if (collaborators[i]._id === currValidCollaborator._id) {
        return;
      }
    }
    const newCollaborator = {
      _id: currValidCollaborator._id,
      name: currValidCollaborator.name,
      email: currValidCollaborator.email,
      username: currValidCollaborator.username,
      photo: currValidCollaborator.photo,
    };
    setCollaborators([...collaborators, newCollaborator]);
    setEnableSave(true);
  };
  const handleSaveChanges = async () => {
    if (enableSave === true) {
      const response = await fetch(
        `${host}/api/event/updateevent/${props.event._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title: title,
            description: description,
            tags: tags,
            collaborators: collaborators,
            eventStartDate: eventStartDate,
            eventEndDate: eventEndDate,
            tasks: tasks,
            admin: admin,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        props.setShowAlert1(true);
        props.setMessage1("Event Updated Successfully");
        props.setType1("success");
        setTimeout(() => {
          props.setShowAlert1(false);
        }, 2500);
        setEnableSave(false);
        backbtn.current.click();
      }
    }
  };
  const exitbtn = useRef(null);
  const handleLeaveEvent = async () => {
    //console.log(user.id);
    const updatedCollaborators = [];
    for (let i = 0; i < collaborators.length; i++) {
      if (collaborators[i]._id !== user.id) {
        updatedCollaborators.push(collaborators[i]);
      }
    }
    setCollaborators(updatedCollaborators);
    const response = await fetch(
      `${host}/api/event/updateevent/${props.event._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tags: tags,
          collaborators: updatedCollaborators,
          eventStartDate: eventStartDate,
          eventEndDate: eventEndDate,
          tasks: tasks,
          admin: admin,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      props.setShowAlert1(true);
      props.setMessage1("You have left the event");
      props.setType1("success");
      setTimeout(() => {
        props.setShowAlert1(false);
      }, 2500);
      setEnableSave(false);
      backbtn.current.click();
    }

    modalRef.current.click();
  };
  const handleDeleteEvent = async () => {
    const response = await fetch(
      `${host}/api/event/deletevent/${props.event._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      props.setShowAlert1(true);
      props.setMessage1("Event Deleted Successfully");
      props.setType1("success");
      setTimeout(() => {
        props.setShowAlert1(false);
      }, 2500);
      setEnableSave(false);

      backbtn.current.click();
    }
    exitbtn.current.click();
  };
 
  return (
    <div className="MyEventOpen">
      {/* <ExitModal
        handleDeleteEvent={handleDeleteEvent}
        darkTheme={props.darkTheme}
        exitbtn={exitbtn}
      /> */}
        <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
        style={{ display: "none" }}
        ref={exitbtn}
      >
        Launch static backdrop modal
      </button>

   
        <div
          className="modal fade"
          id="staticBackdrop1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={
                props.darkTheme === "DarkTheme"
                  ? { backgroundColor: "#363636" }
                  : {}
              }
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel1">
                  Are you sure you want to delete this event?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                Click Delete Event to delete the Event
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDeleteEvent}
                  style={{ backgroundColor: "#ff0000" }}
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        </div>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref={modalRef}
        style={{ display: "none" }}
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={
              props.darkTheme === "DarkTheme"
                ? { backgroundColor: "#363636" }
                : {}
            }
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Are You Sure you want to exit from this event?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {user.id === admin && collaborators.length > 1 ? (
                <>
                  <h6>
                    Before Leaving the Group, please assign someone the new
                    Admin of this Event
                  </h6>
                  <div className="adminSelectbox">
                    {collaborators.map((collaborator) => {
                      if (collaborator._id !== user.id) {
                        return (
                          <div
                            className="adminSelectbox__collaborator"
                            key={collaborator._id}
                          >
                            <img
                              className="collabdp"
                              src={`${host}/uploads/${collaborator.photo}`}
                              alt=""
                            />
                            <h6>{collaborator.name}</h6>
                            <button
                              onClick={() => {
                                setAdmin(collaborator._id);
                                setEnableFinalExit(true);
                                props.setMessage1(
                                  "Now Admin of this Event is " +
                                    collaborator.name
                                );
                                props.setType1("success");
                                props.setShowAlert1(true);
                                setTimeout(() => {
                                  props.setShowAlert1(false);
                                }, 2500);
                                //console.log(admin);
                              }}
                              style={{
                                marginBottom: "0rem",
                                position: "absolute",
                                right: "24px",
                              }}
                              className="btn btn-primary"
                            >
                              Make Admin
                            </button>
                          </div>
                        );
                      } else {
                        // Return null or an empty element for cases when the condition is not met
                        return null;
                      }
                    })}
                  </div>
                </>
              ) : admin === user.id && collaborators.length === 1 ? (
                <h6>
                  You are the only participant of this Event. if You leave this
                  Event, the Event will be deleted.
                </h6>
              ) : (
                <h6>Click on Leave Event to leave</h6>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!enableFinalExit}
                onClick={handleLeaveEvent}
              >
                Leave Event
              </button>
            </div>
          </div>
        </div>
      </div>

      <span
        onClick={() => {
          props.handleEventsClick(props.event);
          props.handlebackfromevent();
        }}
        ref={backbtn}
      >
        <img
          className="backicon"
          src={backicon}
          alt=""
          style={
            props.darkTheme === "DarkTheme" ? { filter: "invert(100%)" } : {}
          }
        />
      </span>
      <div className="activetag">
        {props.event.isActive ? (
          <div className="tag" style={{ backgroundColor: "lightgreen" }}>
            <p
              className="tagText"
              style={{ color: "green", fontWeight: "550" }}
            >
              Active
            </p>
          </div>
        ) : (
          <div className="tag" style={{ backgroundColor: "red" }}>
            <p
              className="tagText"
              style={{ color: "white", fontWeight: "550" }}
            >
              Inactive
            </p>
          </div>
        )}
      </div>
      <div
        className="titlerow"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "28px",
        }}
      >
        <h1
          style={{
            marginBottom: "0rem",
            width: "100vh",
            fontSize: `35px`,
            whiteSpace: "nowrap",
          }}
        >
          {!showtitle && title}{" "}
          {showtitle && (
            <input
              type="text"
              className="eventEdit"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTitleClick();
                }
              }}
              style={props.darkTheme === "DarkTheme" ? { color: "white" } : {}}
              value={title}
              onChange={handleTitleChange}
            />
          )}
          <img
            src={edit}
            alt=""
            className="eventicons"
            onClick={handleTitleClick}
            style={
              props.darkTheme === "DarkTheme"
                ? {
                    filter: "invert(100%)",
                    width: "22px",
                    marginBottom: "31px",
                  }
                : { width: "22px", marginBottom: "31px" }
            }
          />
        </h1>
        <div className="dynamicIcons">
          <img
            src={meeticon}
            className="eventicons"
            alt=""
            onClick={props.handleEventmeetsClick}
            style={
              props.darkTheme === "DarkTheme"
                ? { filter: "invert(100%)", width: "35px" }
                : { width: "35px" }
            }
          />
          <img
            src={chaticon}
            className="eventicons"
            alt=""
            onClick={props.handleChatClick}
            style={
              props.darkTheme === "DarkTheme"
                ? { filter: "invert(100%)", width: "35px" }
                : { width: "35px" }
            }
          />
        </div>
      </div>
      <hr
        style={
          props.darkTheme === "DarkTheme"
            ? {
                width: "65%",
                margin: "0 0",
                border: "1px solid rgb(255 255 255)",
              }
            : { width: "65%", margin: "0 0", border: "1px solid #3d3d3d8f" }
        }
      />
      <form
        className="EventOpenForm"
        style={{ height: "63vh", overflowY: "scroll" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-6 mt-3">
          <div className="definitionrow">
            <label htmlFor="exampleInputEmail1" className="form-label Elabel">
              Event Description
            </label>
            <img
              src={editicon}
              className="eventicons"
              alt=""
              onClick={handleDescClick}
              style={
                props.darkTheme === "DarkTheme"
                  ? { filter: "invert(100%)", width: "25px" }
                  : { width: "25px" }
              }
            />
          </div>
          {!showdesc && <p style={{ marginBottom: "0rem" }}>{description}</p>}
          {showdesc && (
            <textarea
              type="text"
              className="eventEdit"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={description}
              style={
                props.darkTheme === "DarkTheme"
                  ? { color: "white", height: "30vh", width: "100vh" }
                  : { height: "30vh", width: "100vh" }
              }
              onChange={handleDescChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleDescClick();
                }
              }}
            />
          )}
        </div>
        <div className="mb-6">
          <div className="definitionrow">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label Elabel"
            >
              Collaborators
            </label>
            <img
              src={addcollabicon}
              className="eventicons"
              alt=""
              onClick={handleCollabsClick}
              style={
                props.darkTheme === "DarkTheme"
                  ? { filter: "invert(100%)", width: "25px" }
                  : { width: "25px" }
              }
            />
          </div>
          <p>
            There are {collaborators.length} members collaborating in this
            project
          </p>
          <div>
            {collaborators.map((collaborator) => {
              return (
                <div
                  className={`collabrow ${
                    props.darkTheme === "DarkTheme" ? "collabdark" : ""
                  }`}
                  key={collaborator._id}
                >
                  <img
                    className="collabdp"
                    src={`${host}/uploads/${collaborator.photo}`}
                    alt=""
                    style={
                      props.darkTheme === "DarkTheme"
                        ? { boxShadow: "0px 0px 5px 0px #000000" }
                        : {}
                    }
                  />
                  <div className="collabinfo">
                    <p
                      key={collaborator._id}
                      style={{ marginBottom: "0rem", fontSize: "18px" }}
                    >
                      {collaborator.name}
                      {user.id === collaborator._id ? " (You)" : ""}
                    </p>
                    {collaborator._id === admin ? (
                      <p
                        style={{
                          marginBottom: "0rem",
                          fontStyle: "italic",
                          fontSize: "16px",
                        }}
                      >
                        Admin
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          {showcollabs && (
            <div className="collabinput">
              <input
                type="text"
                className="eventEdit"
                style={
                  props.darkTheme === "DarkTheme"
                    ? {
                        color: "white",
                        border: "2px solid grey",
                        borderRadius: "3px",
                      }
                    : { border: "2px solid grey", borderRadius: "3px" }
                }
                spellCheck="false"
                onChange={oncollabchange}
                placeholder="Enter username of the collaborator to be added"
              />

              {promptdisplay !== "" ? (
                <li
                  style={{ padding: "3px 5px 3px 10px", cursor: "pointer" }}
                  onClick={handleAddCollab}
                >
                  {promptdisplay}
                </li>
              ) : (
                " "
              )}
            </div>
          )}
        </div>
        <div className="mb-6">
          <div className="definitionrow">
            <label htmlFor="exampleInputEmail1" className="form-label Elabel">
              Tags
            </label>
            <img
              src={tagicon}
              className="eventicons"
              alt=""
              onClick={handleTagClick}
              style={
                props.darkTheme === "DarkTheme"
                  ? { filter: "invert(100%)", width: "25px" }
                  : { width: "25px" }
              }
            />
          </div>

          <div className="content">
            {tags.length > 0 ? <ul>{createTag()}</ul> : " "}
            {showtags && (
              <input
                type="text"
                className="eventEdit"
                style={
                  props.darkTheme === "DarkTheme"
                    ? {
                        color: "white",
                        border: "1px solid grey",
                        borderRadius: "3px",
                      }
                    : { border: "1px solid grey", borderRadius: "3px" }
                }
                spellCheck="false"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(e);
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className="mb-6">
          <div className="definitionrow">
            <label htmlFor="exampleInputEmail1" className="form-label Elabel">
              Tasks
            </label>
            <p style={{ marginBottom: "0rem", fontSize: "18px" }}>
              {task_completed}/{tasks.length} tasks completed
            </p>
            <img
              src={addtaskicon}
              className="eventicons"
              alt=""
              onClick={handleTasksClick}
              style={
                props.darkTheme === "DarkTheme"
                  ? { filter: "invert(100%)", width: "25px" }
                  : { width: "25px" }
              }
            />
          </div>
          <div className="taskcontent">
            {tasks.length === 0 ? (
              <p style={{ marginBottom: "0rem", fontSize: "18px" }}>
                No tasks added yet
              </p>
            ) : (
              tasks.map((task, id) => (
                <div
                  className={`${
                    props.darkTheme === "DarkTheme" ? "taskdarkrow" : "taskrow"
                  }`}
                  key={id}
                >
                  <input
                    type="checkbox"
                    style={{ width: "21px", height: "21px" }}
                    checked={task.completed}
                    onChange={() => {
                      handletaskCheck(task);
                    }}
                  />
                  {showTaskrow ? (
                    <>
                      <p style={{ marginBottom: "0rem", fontSize: "18px" }}>
                        {task.description}
                      </p>
                      <img
                        src={editicon}
                        alt=""
                        onClick={() => {
                          setShowTaskrow(!showTaskrow);
                        }}
                        className="eventicons"
                        style={
                          props.darkTheme === "DarkTheme"
                            ? { filter: "invert(100%)", width: "15px" }
                            : { width: "15px" }
                        }
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      className="eventEdit"
                      value={task.description}
                      style={
                        props.darkTheme === "DarkTheme"
                          ? {
                              color: "white",
                              width: "100%",
                              fontSize: "18px",
                            }
                          : { width: "100%", fontSize: "18px" }
                      }
                      onChange={(e) => {
                        handleTaskChange(e, task);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setShowTaskrow(!showTaskrow);
                        }
                      }}
                      id="exampleTaskInput"
                      aria-describedby="emailHelp"
                    />
                  )}
                </div>
              ))
            )}
          </div>
          {showtasks && (
            <input
              type="text"
              className="eventEdit"
              style={
                props.darkTheme === "DarkTheme"
                  ? {
                      color: "white",
                      border: "2px solid grey",
                      borderRadius: "5px",
                      width: "100%",
                    }
                  : {
                      border: "2px solid grey",
                      borderRadius: "5px",
                      width: "100%",
                    }
              }
              id="exampleTaskInput"
              aria-describedby="emailHelp"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddtask(e);
                  handleTasksClick();
                }
              }}
            />
          )}
        </div>
        <div className="mb-6">
          <div className="definitionrow">
            <label htmlFor="exampleInputEmail1" className="form-label Elabel">
              Event Start Date
            </label>
            <img
              src={calendarIcon}
              className="eventicons"
              alt=""
              style={
                props.darkTheme === "DarkTheme"
                  ? { filter: "invert(100%)", width: "25px" }
                  : { width: "25px" }
              }
            />
          </div>
          <input
            type="date"
            className="calendarInput eventEdit"
            spellCheck="false"
            value={eventStartDate}
            style={
              props.darkTheme === "DarkTheme"
                ? {
                    color: "white",
                    border: "1px solid grey",
                    borderRadius: "3px",
                    colorScheme: "dark",
                    padding: "4px",
                    marginTop: "16px",
                  }
                : {
                    border: "1px solid grey",
                    borderRadius: "3px",
                    padding: "4px",
                    marginTop: "16px",
                  }
            }
            onChange={(e) => {
              if (e.target.value <= eventEndDate) {
                setEnableSave(true);
                setEventStartDate(e.target.value);
              } else {
                props.setMessage1("Start date cannot be greater than end date");
                props.setType1("warning");
                props.setShowAlert1(true);
                setTimeout(() => {
                  props.setShowAlert1(false);
                }, 2000);
              }
            }}
          />
        </div>
        <div className="mb-6">
          <div className="definitionrow">
            <label htmlFor="exampleInputEmail1" className="form-label Elabel">
              Event End Date
            </label>
            <img
              src={calendarIcon}
              className="eventicons"
              alt=""
              style={
                props.darkTheme === "DarkTheme"
                  ? { filter: "invert(100%)", width: "25px" }
                  : { width: "25px" }
              }
            />
          </div>
          <input
            type="date"
            className="calendarInput eventEdit"
            spellCheck="false"
            value={eventEndDate}
            style={
              props.darkTheme === "DarkTheme"
                ? {
                    color: "white",
                    border: "1px solid grey",
                    borderRadius: "3px",
                    colorScheme: "dark",
                    padding: "4px",
                    marginTop: "16px",
                  }
                : {
                    border: "1px solid grey",
                    borderRadius: "3px",
                    padding: "4px",
                    marginTop: "16px",
                  }
            }
            onChange={(e) => {
              if (e.target.value >= eventStartDate) {
                setEnableSave(true);
                setEventEndDate(e.target.value);
              } else {
                props.setMessage1("End date cannot be less than start date");
                props.setType1("warning");
                props.setShowAlert1(true);
                setTimeout(() => {
                  props.setShowAlert1(false);
                }, 2000);
              }
            }}
          />
        </div>
        <div className="actionRow">
          <button
            className="btn btn-primary"
            disabled={!enableSave}
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            className="exit"
            id="exit"
            style={{ backgroundColor: "red", color: "white", border: "none" }}
            onClick={() => {
              modalRef.current.click();
            }}
          >
            {" "}
            Exit From this Event
          </button>
          <button
            className="btn btn-primary delete"
            id="delete"
            style={{ backgroundColor: "red", color: "white", border: "none" }}
            disabled={!enableDelete}
            onClick={() => {
              exitbtn.current.click();
            }}
          >
            {" "}
            Delete Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventOpen;
