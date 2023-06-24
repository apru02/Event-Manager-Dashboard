//import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupComponent from "./components/signup";
import SigninComponent from "./components/Login";
import EventState from "./Context/EventState";
import UpdateAccount from "./components/UpdateAccount";
//import { useNavigate } from "react-router-dom";
function App() {
  //const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  

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
                <Dashboard />
                <Profile />
              </div>
            }
          />
          <Route exact path="/signup" element={<SignupComponent />} />
          <Route exact path="/signin" element={<SigninComponent />} />
          <Route exact path="/editaccount" element={<UpdateAccount/>} />
        </Routes>
      </Router>
    </EventState>
    </>
  );
}

export default App;
