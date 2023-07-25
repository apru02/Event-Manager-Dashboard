import React from "react";
import "../App.css";
import EventsNav from "./EventsNav";
import Navbar from "./Navbar";
import EventsCard from "./EventsCard";
import eventContext from "../Context/EventContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EventOpen from "./EventOpen";

const Dashboard = (props) => {
  const context = useContext(eventContext);
  const { events, getEvents } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getEvents();
    } else {
      navigate("/signin");
    }
    const interval = setInterval(() => {
      getEvents();
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  const [showdashboard, setShowdashboard] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventsClick = (event) => {
    if (showdashboard === false) {
      setShowdashboard(true);
      setSelectedEvent(null);
    } else {
      setShowdashboard(false);
      setSelectedEvent(event);
    }
  };
  const handleChatClick = () => {
    props.handleChatClick();
  };
  const [Active, setActive] = useState("true");
  const SetEventStatus = (value) => {
    setActive(value);
  };
  return (
    <>
      <div className={`part1 ${props.darkTheme}`}>
        <Navbar
          setDarkTheme1={props.setDarkTheme1}
          darkTheme={props.darkTheme}
          handleEventsClick={handleEventsClick}
        />
        {showdashboard && (
          <div className="main_container">
            <h1 className="main_title">Event Dashboard</h1>
            <EventsNav SetEventStatus={SetEventStatus} />
           
              {events ? (
                <div className="eventsContainer">
                  {events && events.length > 0 ? ( // Check if events exists and is not an empty array
                    (() => {
                      const eventsToRender = [];
                      for (let i = 0; i < events.length; i++) {
                        const event = events[i];
                        const eventIsActive =
                          Active === "true"
                            ? event.isActive
                            : Active === "false"
                            ? !event.isActive
                            : true;
                        if (eventIsActive) {
                          eventsToRender.push(
                            <EventsCard
                              key={event._id}
                              id={event._id}
                              title={event.title}
                              startDate={event.eventStartDate}
                              endDate={event.eventEndDate}
                              tags={event.tags}
                              description={event.description}
                              isActive={event.isActive}
                              collaborators={event.collaborators}
                              admin={event.admin}
                              event={event}
                              handleEventsClick={handleEventsClick}
                              changeevent={props.changeevent}
                              setShowAlert1={props.setShowAlert1}
                              setMessage1={props.setMessage1}
                              setType1={props.setType1}
                              darkTheme={props.darkTheme}
                            />
                          );
                        }
                      }
                      return eventsToRender;
                    })()
                  ) : (
                    <div className="noEvents">
                      <h1>No Events to show</h1>
                    </div>
                  )}
                </div>
              ) : (
                <div className="loadingSpinner">Loading...</div> // Fallback while events are being fetched
              )}
            </div>
       
        )}
        {!showdashboard && (
          <EventOpen
            event={selectedEvent}
            handleEventsClick={handleEventsClick}
            handleChatClick={handleChatClick}
            handlebackfromevent={props.handlebackfromevent}
            handleEventmeetsClick={props.handleEventmeetsClick}
            setShowAlert1={props.setShowAlert1}
            setMessage1={props.setMessage1}
            setType1={props.setType1}
            darkTheme={props.darkTheme}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
