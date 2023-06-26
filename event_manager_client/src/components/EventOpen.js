import React from "react";
import backicon from "./logos/back.png";
import "../App.css";
const EventOpen = (props) => {
  return (
    <div className="MyEventOpen">
      <span onClick={() => props.handleEventsClick(props.event)}>
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
      <h1>{props.event.title}</h1>
      <hr
        style={{ width: "65%", margin: "0 0", border: "1px solid #3d3d3d8f" }}
      />
      <form
        className="EventOpenForm"
        style={{ height: "63vh", overflowY: "scroll" }}
      >
        <div className="mb-6 mt-3">
          <label htmlFor="exampleInputEmail1" className="form-label Elabel">
            Event Description
          </label>
          <p style={{ marginBottom: "0rem" }}>{props.event.description}</p>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            style={{ display: "none" }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="exampleInputPassword1" className="form-label Elabel">
            Collaborators
          </label>
          <p>
            There are {props.event.collaborators.length} members collaborating
            in this project
          </p>
          <div>
            {props.event.collaborators.map((collaborator) => {
              return (
                <div className="collabrow">
                  <img
                    className="collabdp"
                    src={`http://localhost:5000/uploads/${collaborator.photo}`}
                    alt=""
                  />
                  <div className="collabinfo">
                    <p
                      key={collaborator._id}
                      style={{ marginBottom: "0rem", fontSize: "18px" }}
                    >
                      {collaborator.name}
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
                    ) : (
                      " "
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            style={{ display: "none" }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="exampleInputEmail1" className="form-label Elabel">
            Tags
          </label>

          <div className="content">
            {props.event.tags.length === 0 ? (
              <p style={{ marginBottom: "0rem", fontSize: "18px",marginLeft:"-15px" }}>No tags added for this event</p>
            ) : (
              <ul>
                {props.event.tags.map((tag) => (
                  <li key={tag}>
                    {tag} <i className="uit uit-multiply"></i>
                  </li>
                ))}
              </ul>
            )}

            <input type="text" spellCheck="false" style={{ display: "none" }} />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="exampleInputEmail1" className="form-label Elabel">
            Tasks
          </label>
          <div className="taskcontent">
            {props.event.tasks.length === 0 ? (
              <p style={{ marginBottom: "0rem", fontSize: "18px" }}>
                No tasks added yet
              </p>
            ) : (
              props.event.tasks.map((task) => (
                <div className="taskrow" key={task.id}>
                  <input
                    type="checkbox"
                    style={{ width: "21px", height: "21px" }}
                    checked={task.completed}
                  />
                  <p style={{ marginBottom: "0rem", fontSize: "18px" }}>
                    {task.description}
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleTaskInput"
                    aria-describedby="emailHelp"
                    style={{ display: "none" }}
                  />
                </div>
              ))
            )}
          </div>

          <input
            type="text"
            className="form-control"
            id="exampleNewTaskInput"
            aria-describedby="emailHelp"
            style={{ display: "none" }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventOpen;
