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
import "../App.css";

const EventOpen = (props) => {
  const host = "http://localhost:5000";
  const authtoken = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState(props.event.tasks);
  const [task_completed, setTask_completed] = useState(0);
  const [enableSave, setEnableSave] = useState(false);
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
    if (authtoken) {
      fetchUser();
      completedtasks();
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

  const [collaborators, setCollaborators] = useState(props.event.collaborators);
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
          class="cross"
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
      }
    }
  };
  return (
    <div className="MyEventOpen">
      <span
        onClick={() => {
          props.handleEventsClick(props.event);
          props.handlebackfromevent();
        }}
      >
        <img className="backicon" src={backicon} alt="" />
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
          <div className="tag" style={{ backgroundColor: "darkyellow" }}>
            <p className="tagText" style={{ color: "red", fontWeight: "550" }}>
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
              class="eventEdit"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTitleClick();
                }
              }}
              value={title}
              onChange={handleTitleChange}
            />
          )}
          <img
            src={edit}
            style={{ width: "22px", marginBottom: "31px" }}
            alt=""
            className="eventicons"
            onClick={handleTitleClick}
          />
        </h1>
        <div className="dynamicIcons">
          <img
            src={meeticon}
            className="eventicons"
            alt=""
            style={{ width: "35px" }}
            onClick={props.handleEventmeetsClick}
          />
          <img
            src={chaticon}
            className="eventicons"
            alt=""
            style={{ width: "35px" }}
            onClick={props.handleChatClick}
          />
        </div>
      </div>
      <hr
        style={{ width: "65%", margin: "0 0", border: "1px solid #3d3d3d8f" }}
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
              style={{ width: "25px" }}
              alt=""
              onClick={handleDescClick}
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
              style={{ height: "30vh", width: "100vh" }}
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
              style={{ width: "25px" }}
              alt=""
              onClick={handleCollabsClick}
            />
          </div>
          <p>
            There are {collaborators.length} members collaborating in this
            project
          </p>
          <div>
            {collaborators.map((collaborator) => {
              return (
                <div className="collabrow">
                  <img
                    className="collabdp"
                    src={`${host}/uploads/${collaborator.photo}`}
                    alt=""
                  />
                  <div className="collabinfo">
                    <p
                      key={collaborator._id}
                      style={{ marginBottom: "0rem", fontSize: "18px" }}
                    >
                      {collaborator.name}
                      {user.id === collaborator._id ? " (You)" : ""}
                    </p>
                    {collaborator._id === props.event.admin ? (
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
                style={{ border: "2px solid grey", borderRadius: "3px" }}
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
              style={{ width: "25px" }}
              alt=""
              onClick={handleTagClick}
            />
          </div>

          <div className="content">
            {tags.length > 0 ? <ul>{createTag()}</ul> : " "}
            {showtags && (
              <input
                type="text"
                class="eventEdit"
                style={{ border: "1px solid grey", borderRadius: "3px" }}
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
              style={{ width: "25px" }}
              alt=""
              onClick={handleTasksClick}
            />
          </div>
          <div className="taskcontent">
            {tasks.length === 0 ? (
              <p style={{ marginBottom: "0rem", fontSize: "18px" }}>
                No tasks added yet
              </p>
            ) : (
              tasks.map((task, id) => (
                <div className="taskrow" key={id}>
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
                        style={{ width: "15px" }}
                        className="eventicons"
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      className="eventEdit"
                      value={task.description}
                      style={{ width: "100%", fontSize: "18px" }}
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
              style={{
                border: "2px solid grey",
                borderRadius: "5px",
                width: "100%",
              }}
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
              style={{ width: "25px" }}
              alt=""
            />
          </div>
          <input
            type="date"
            className="calendarInput eventEdit"
            style={{ border: "1px solid grey", borderRadius: "3px" }}
            spellCheck="false"
            value={eventStartDate}
            onChange={(e) => {
              if (e.target.value <= eventEndDate) {
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
              style={{ width: "25px" }}
              alt=""
            />
          </div>
          <input
            type="date"
            className="calendarInput eventEdit"
            style={{ border: "1px solid grey", borderRadius: "3px" }}
            spellCheck="false"
            value={eventEndDate}
            onChange={(e) => {
              if (e.target.value >= eventStartDate) {
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
            className="btn btn-primary"
            style={{ backgroundColor: "red", color: "white" }}
          >
            {" "}
            Exit From this Event
          </button>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "red", color: "white" }}
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
