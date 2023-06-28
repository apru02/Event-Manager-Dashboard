//import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupComponent from "./components/signup";
import SigninComponent from "./components/Login";
import EventState from "./Context/EventState";
import UpdateAccount from "./components/UpdateAccount";
import { useState } from "react";


//import { useNavigate } from "react-router-dom";
function App() {
  //const navigate = useNavigate();
  // const token = localStorage.getItem("token");

  const [showchat, setShowchat] = useState(false);
  const [showMeets, setShowMeets] = useState(false);
  const [currentEvent, setCurrentEvent] = useState([]);
  const [showEventMeet, setShowEventMeet] = useState(false);
  const handleEventmeetsClick = () => {
    if (showEventMeet === false) {
      setShowEventMeet(true);
      setShowMeets(false);
      setShowchat(false);
    } else {
      setShowEventMeet(false);
    }
  };

  const changeevent = (event) => {
    setCurrentEvent(event);
    //console.log(currentEvent);
  };

  const handlebackfromevent = () => {
    if (showchat === true) {
      setShowchat(false);
      
    }
    if (showEventMeet === true) {
      setShowEventMeet(false);
    }
    
  };
  const handlebackfromMeet = () => {
    if (showMeets === true) {
      setShowMeets(false);
    }
  };
  const handlemeetclick = () => {
    if (showMeets === false) {
      handlebackfromevent();
      setShowMeets(true);
      setShowEventMeet(false);
    } else {
      setShowMeets(false);
    }
  };
  const handleChatClick = () => {
    if (showchat === false) {
      handlebackfromMeet();
      setShowchat(true);
      setShowEventMeet(false);
    } else {
      setShowchat(false);
    }
    //console.log(showchat);
  };

  return (
    <>
      <EventState>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div className="grid-container">
                  <Dashboard
                    handleChatClick={handleChatClick}
                    handlebackfromevent={handlebackfromevent}
                    changeevent={changeevent}
                    handleEventmeetsClick={handleEventmeetsClick}
                  />
                  <Profile
                    showchat={showchat}
                    showMeets={showMeets}
                    currentEvent={currentEvent}
                    handleChatClick={handleChatClick}
                    handlemeetclick={handlemeetclick}
                    showEventMeet={showEventMeet}
                  />
                </div>
              }
            />
            <Route exact path="/signup" element={<SignupComponent />} />
            <Route exact path="/signin" element={<SigninComponent />} />
            <Route exact path="/editaccount" element={<UpdateAccount />} />
          </Routes>
        </Router>
      </EventState>
    </>
  );
}

export default App;
