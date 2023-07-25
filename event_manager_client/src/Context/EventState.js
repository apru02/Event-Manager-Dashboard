//import { set } from "mongoose";
import eventContext from "./EventContext";
import { useState } from "react";
import { useEffect } from "react";
const EventState = (props) => {
  const host = "http://localhost:5000";
  const eventsInitial = [];
  const [events, setEvents] = useState(eventsInitial);
  const [curruser, setcurruser] = useState({});// Get user details
  const [meetings, setMeetings] = useState([]);
  let authtoken = localStorage.getItem("token");
  // Get all Notes
  useEffect(() => {
    if (authtoken) {
      getEvents();
      getUserDetails();
      fetchMeetings();
    } else {
      setEvents(eventsInitial); // Clear events data
      setcurruser({});
    }
    // eslint-disable-next-line
  }, [authtoken]);
  const getUserDetails = async () => {
    // API Call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    setcurruser(json);
  };
  const fetchMeetings = async () => {
    const response = await fetch(`${host}/api/meet/getallmeetings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    setMeetings(json);
  };
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

  // Add a Event
  const addEvent = async (
    title,
    description,
    tags,
    eventStartDate,
    eventEndDate,
    collaborators_array
  ) => {
    // TODO: API Call
    // API Call
    const collaborators = [];
    if (collaborators_array.length > 0) {
      for (let collaborator of collaborators_array) {
        const item = {
          _id: collaborator._id,
          name: collaborator.name,
          email: collaborator.email,
          photo: collaborator.photo,
          username: collaborator.username,
        };
        collaborators.push(item);
      }
    }

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
        collaborators,
      }),
    });

    const event = await response.json();
    setEvents(events.push(event));
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
    //console.log(json);
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
      body: JSON.stringify({
        title,
        description,
        tags,
        eventStartDate,
        eventEndDate,
      }),
    });
    const json = await response.json();
    //console.log(json);

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
      value={{ events, curruser,meetings,fetchMeetings, getUserDetails, getEvents, addEvent, deleteEvent, editEvent }}
    >
      {props.children}
    </eventContext.Provider>
  );
};
export default EventState;
