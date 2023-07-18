//import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupComponent from "./components/signup";
import SigninComponent from "./components/Login";
import EventState from "./Context/EventState";
import UpdateAccount from "./components/UpdateAccount";
import Alert from "./components/Alert";
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
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const setShowAlert1 = (value) => {
    setShowAlert(value);
  };
  const setMessage1 = (value) => {
    setMessage(value);
  };
  const setType1 = (value) => {
    setType(value);
  };

  return (
    <>
      <EventState>
        {showAlert && <Alert message={message} type={type} />}
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
                    setShowAlert1={setShowAlert1}
                    setMessage1={setMessage1}
                    setType1={setType1}
                  />
                  <Profile
                    showchat={showchat}
                    showMeets={showMeets}
                    currentEvent={currentEvent}
                    handleChatClick={handleChatClick}
                    handlemeetclick={handlemeetclick}
                    showEventMeet={showEventMeet}
                    setShowAlert1={setShowAlert1}
                    setMessage1={setMessage1}
                    setType1={setType1}
                  />
                </div>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <SignupComponent
                  setShowAlert1={setShowAlert1}
                  setMessage1={setMessage1}
                  setType1={setType1}
                />
              }
            />
            <Route
              exact
              path="/signin"
              element={
                <SigninComponent
                  setShowAlert1={setShowAlert1}
                  setMessage1={setMessage1}
                  setType1={setType1}
                />
              }
            />
            <Route
              exact
              path="/editaccount"
              element={
                <UpdateAccount
                  setShowAlert1={setShowAlert1}
                  setMessage1={setMessage1}
                  setType1={setType1}
                />
              }
            />
          </Routes>
        </Router>
      </EventState>
    </>
  );
}

export default App;
