import React from "react";
import "../App.css";
const EventsNav = (props) => {
  const togglenavbar = (event) => {
    const clickedItem = event.currentTarget;
    const listItems = document.querySelectorAll(".events_mode");

    listItems.forEach((item) => {
      if (item === clickedItem) {
        if (!item.classList.contains("activated")) {
          item.classList.add("activated");
        }
      } else {
        if (item.classList.contains("activated")) {
          item.classList.remove("activated");
        }
      }
    });
  };

  return (
    <nav className="navbar" style={{ padding: "8px 17px 0px 71px" }}>
      <ul className="nav_items">
        <li
          className="events_mode activated"
          onClick={(e) => {
            props.SetEventStatus("true");
            togglenavbar(e);
          }}
          style={{ fontSize: "20px", fontWeight: "normal" }}
        >
          Active Events
        </li>
        <li
          className="events_mode"
          onClick={(e) => {
            props.SetEventStatus("all");
            togglenavbar(e);
          }}
          style={{ fontSize: "20px", fontWeight: "normal" }}
        >
          All Events
        </li>
        <li
          className="events_mode"
          onClick={(e) => {
            props.SetEventStatus("false");
            togglenavbar(e);
          }}
          style={{ fontSize: "20px", fontWeight: "normal" }}
        >
          Past Events
        </li>
      </ul>
    </nav>
  );
};

export default EventsNav;
