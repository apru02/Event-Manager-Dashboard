import React from "react";
import "../App.css";
import EventsNav from "./EventsNav";    
import Navbar from "./Navbar";
import EventsCard from "./EventsCard";
const Dashboard = () => {
  return (
    <div className="part1">
      <Navbar />
      <h1 className="main_title">Event Dashboard</h1>
      <EventsNav />
      <div className="eventsContainer">

      <EventsCard title="Scintillations" extra="+2" />
      <EventsCard title="Hackathon" extra="+3" />
      <EventsCard title="Instruo" extra="+9" />
      <EventsCard title="Rebeca" extra="+7" />
      <EventsCard title="E-woke" extra="+7" />
      </div>
    </div>
  );
};

export default Dashboard;
