import eventContext from "./EventContext";
import { useState } from "react";
import { useEffect } from "react";
const EventState = (props) => {
  const host = "http://localhost:5000";
  const eventsInitial = [];
  const [events, setEvents] = useState(eventsInitial);
  let authtoken = localStorage.getItem("token");
  // Get all Notes
  useEffect(() => {
    if (authtoken) {
      getEvents();
    } else {
      setEvents(eventsInitial); // Clear events data
    }
    // eslint-disable-next-line
  }, [authtoken]);
  const getEvents = async () => {
    // API Call
    const response = await fetch(`${host}/api/event/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    setEvents(json);
  };

  // Add a Note
  const addEvent = async (
    title,
    description,
    tags,
    eventStartDate,
    eventEndDate
  ) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/event/createevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
      body: JSON.stringify({
        title,
        description,
        tags,
        eventStartDate,
        eventEndDate,
      }),
    });

    const event = await response.json();
    setEvents(events.concat(event));
  };

  // Delete a Note
  const deleteEvent = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/events/deletevent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = response.json();
    console.log(json);
    const newEvents = events.filter((event) => {
      return event._id !== id;
    });
    setEvents(newEvents);
  };

  // Edit a Note
  const editEvent = async (
    id,
    title,
    description,
    tags,
    eventStartDate,
    eventEndDate
  ) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
      body: JSON.stringify({title, description, tags, eventStartDate, eventEndDate }),
    });
    const json = await response.json();
    console.log(json);

    let newEvents = JSON.parse(JSON.stringify(events));
    // Logic to edit in client
    for (let index = 0; index < newEvents.length; index++) {
      const element = newEvents[index];
      if (element._id === id) {
        newEvents[index].title = title;
        newEvents[index].description = description;
        newEvents[index].tags = tags;
        newEvents[index].eventStartDate = eventStartDate;
        newEvents[index].eventEndDate = eventEndDate;

        break;
      }
    }
    setEvents(newEvents);
  };

  return (
    <eventContext.Provider
      value={{ events, getEvents, addEvent, deleteEvent, editEvent }}
    >
      {props.children}
    </eventContext.Provider>
  );
};
export default EventState;






 



