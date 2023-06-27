import React from "react";
import "../App.css";
import Tags from "./Tags";
//import dp1 from "./logos/30.png";
import edit from "./logos/pencil-2.png";
const EventsCard = (props) => {
  // const fetchUserImage = async (user) => {
  //   const userid = user.toString();
  //   const response = await fetch(
  //     `http://localhost:5000/api/auth/getuserdp/${userid}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const json = await response.json();

  //   const filename = json.filename;
  //   console.log(filename.type);
  //   const url = `http://localhost:5000/uploads/${filename}`;
  //   return url;
  // };

  return (
    <div className="card" onClick={() => {
      props.handleEventsClick(props.event);
      props.changeevent(props.event)
      }}>
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
          {`${props.startDate} - ${props.endDate}`}
        </p>
      </div>
      <div className="secondRow">
        {props.tags.length <= 3 ? (
          props.tags.map((tag) => <Tags key={tag} title={tag} />)
        ) : (
          <>
            <Tags key={props.tags[0]} title={props.tags[0]} />
            <Tags key={props.tags[1]} title={props.tags[1]} />
            <Tags key={props.tags[2]} title={props.tags[2]} />
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
                  src={`http://localhost:5000/uploads/${collaborator.photo}`}
                  alt="collabs"
                  onError={(e) => {
                    e.target.src =
                      "http://localhost:5000/uploads/defaultUpload.png";
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
                    src={`http://localhost:5000/uploads/${collaborator.photo}`}
                    alt="collabs"
                    onError={(e) => {
                      e.target.src =
                        "http://localhost:5000/uploads/defaultUpload.png";
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
          <img src={edit} alt="edit" width="40px" />
        </span>
      </div>
    </div>
  );
};

export default EventsCard;
