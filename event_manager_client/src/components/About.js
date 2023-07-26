import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faUsers, faTags, faComment, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import "../App.css"
const About = () => {
  return (
    <div className='About-page'>
      <h1>About</h1>
      <p className="about-text">
        This is a full stack MERN application for managing events.
        <br />
        Version: 1.0.0
      </p>
      <div className="features">
        <div className="feature">
          <FontAwesomeIcon icon={faCode} className="icon" />
          <p>Create Events</p>
          <p>In this Web App, you can create events with all the necessary details.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <p>Add Collaborators</p>
          <p>Add collaborators for easy team management and communication.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faTags} className="icon" />
          <p>Add Tags</p>
          <p>Categorize your events with tags for easy organization.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faComment} className="icon" />
          <p>Chat Feature</p>
          <p>Communicate with team members using the built-in chat feature.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          <p>Event Meets</p>
          <p>Add event meets to manage your events effectively.</p>
        </div>
      </div>
      <p className="about-text">
        Hope you like it.
        <br />
        Created by: <a href="https://www.linkedin.com/in/abhishek-kumar-4b1b3a1b2/">Abhishek Kumar</a>
        <br />
        My GitHub Profile: <a href="https://github.com/your-github-profile">Your GitHub Profile</a>
      </p>
      <p className="repo-link">
        GitHub Repository Link for this project:
        <br />
        <a href="https://github.com/your-repo-link">Your GitHub Repo Link</a>
      </p>
    </div>
  );
};

export default About;
