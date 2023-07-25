import React, { useEffect, useState } from "react";
import "../App.css";
import Tags from "./Tags";
import edit from "./logos/pencil-2.png";
const {host} = require("../env.js");
const EventsCard = (props) => {
  //const host = "http://localhost:5000";
  const [user, setUser] = useState({});
  const [isCheck, setIsCheck] = useState(props.isActive);
  const authtoken = localStorage.getItem("token");

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
      const user = {
        id: json._id,
        name: json.name,
        username: json.username,
        email: json.email,
        photo: json.photo,
      };
      setUser(user);
    };
    fetchUser();
  }, [authtoken]);

  const handleStatusChange = async (e) => {
    if (user.id !== props.admin) {
      props.setShowAlert1(true);
      props.setMessage1("You are not authorized to change the status");
      props.setType1("danger");
      setTimeout(() => {
        props.setShowAlert1(false);
      }, 2000);
    } else {
      setIsCheck(e.target.checked);
      const response = await fetch(
        `${host}/api/event/updateeventstatus/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
          body: JSON.stringify({
            isActive: Boolean(e.target.checked),
          }),
        }
      );
      const json = await response.json();
      //console.log(json);
      if (json.success) {
        props.setShowAlert1(true);
        props.setMessage1("Event status updated successfully");
        props.setType1("success");

        setTimeout(() => {
          props.setShowAlert1(false);
        }, 1000);
      }
    }
  };

  return (
    <div
      className={`card ${
        props.darkTheme === "DarkTheme" ? "card-dark-mode" : ""
      }`}
    >
      <div className="firstRow">
        <p className="eventTitle" style={{ marginBottom: "0rem" }}>
          {props.title}
        </p>
        <label className="switch">
          <input
            type="checkbox"
            id="toggleSwitch"
            checked={isCheck}
            onChange={handleStatusChange}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="dates">
        <p className="date" style={{ marginBottom: "0rem" }}>
          {`${props.startDate} - ${props.endDate}`}
        </p>
      </div>
      <div className="secondRow">
        {props.tags.length <= 3 ? (
          props.tags.map((tag) => <Tags key={tag} title={tag} darkTheme = {props.darkTheme} />)
        ) : (
          <>
            <Tags key={props.tags[0]} title={props.tags[0]} darkTheme = {props.darkTheme}/>
            <Tags key={props.tags[1]} title={props.tags[1]} darkTheme = {props.darkTheme}/>
            <Tags key={props.tags[2]} title={props.tags[2]} darkTheme = {props.darkTheme}/>
          </>
        )}
      </div>
      <div className="thirdRow">
        <div className="teamRow">
          {props.collaborators.length <= 2 ? (
            props.collaborators.map((collaborator) => (
              <span className="dp" key={collaborator._id}>
                <img
                  className="dp_element"
                  src={`${host}/uploads/${collaborator.photo}`}
                  alt="collabs"
                  onError={(e) => {
                    e.target.src =
                      `${host}/uploads/defaultUpload.png`;
                  }}
                  width="48px"
                />
              </span>
            ))
          ) : (
            <>
              {props.collaborators.slice(0, 2).map((collaborator) => (
                <span className="dp" key={collaborator._id}>
                  <img
                    className="dp_element"
                    src={`${host}/uploads/${collaborator.photo}`}
                    alt="collabs"
                    onError={(e) => {
                      e.target.src =
                        `${host}/uploads/defaultUpload.png`;
                    }}
                    width="48px"
                  />
                </span>
              ))}
              {props.collaborators.length > 2 && (
                <span className="numbers">
                  +{props.collaborators.length - 2}
                </span>
              )}
            </>
          )}
        </div>
        <span
          className="edit_btn"
          style={{ position: "absolute", left: "268px" }}
        >
          <img
            src={edit}
            alt="edit"
            className="editIcon"
            width="40px"
            onClick={() => {
              props.handleEventsClick(props.event);
              props.changeevent(props.event);
            }}
            style={
              props.darkTheme === "DarkTheme"
                ? { filter: "invert(100%)" }
                : { filter: "invert(0%)" }
            }
          />
        </span>
      </div>
    </div>
  );
};

export default EventsCard;
