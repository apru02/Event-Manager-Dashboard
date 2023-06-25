import React from "react";

const EventOpen = ({event}) => {
  return (
    <div>
        <span onClick={}></span>
      <form>
          <h1>{event.title}</h1>
          <hr />
        <div className="mb-3">
          <label htmFor="exampleInputEmail1" className="form-label">
            Event Description
          </label>
          <p>{event.description}</p>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            style={{display:"none"}}
          />
          
        </div>
        <div className="mb-3">
          <label htmFor="exampleInputPassword1" className="form-label">
            Collaborators
          </label>
          <div>
            {event.collaborators.map((collaborator) => {
                return <p>{collaborator.name}</p>;
            })}
          </div>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            style={{display:"none"}}
          />
        </div>
        <div className="mb-3">
          <label htmFor="exampleInputEmail1" className="form-label">
            Tags
          </label>
          {event.tags.map((tag) => {
                return <p>{tag}</p>;
            })
          }
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            style={{display:"none"}}
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
