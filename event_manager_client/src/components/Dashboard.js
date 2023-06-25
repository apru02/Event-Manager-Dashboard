import React from "react";
import "../App.css";
import EventsNav from "./EventsNav";
import Navbar from "./Navbar";
import EventsCard from "./EventsCard";
import eventContext from "../Context/EventContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const context = useContext(eventContext);
  const { events, getEvents } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getEvents();
    } else {
      navigate("/signin");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="part1">
        <Navbar />

        <div className="main_container">
          <h1 className="main_title">Event Dashboard</h1>
          <EventsNav />
          <div className="eventsContainer">
            {!events ? (
              <div className="noEvents">
                <h1>No Events to show</h1>
              </div>
            ) : (
              events.map((event) => (
                <EventsCard
                  key={event._id}
                  title={event.title}
                  startDate={event.eventStartDate}
                  endDate={event.eventEndDate}
                  tags={event.tags}
                  description={event.description}
                  isActive={event.isActive}
                  collaborators={event.collaborators}
                  admin={event.admin}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
