import React, { useState, useEffect } from "react";
import message from "./logos/video.png";
import notifications from "./logos/bell.png";
import dp from "./logos/user.png";
import Userdetail from "./Userdetail";
import "../App.css";
const UserNav = (props) => {
  const authtoken = localStorage.getItem("token");
  const [imagesrc, setImagesrc] = useState("");
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    photo: "",
  });
  useEffect(() => {
    const fetchUserImage = async () => {
      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authtoken,
        },
      });
      const json = await response.json();
      //console.log(json);
      const user = {
        id: json._id,
        name: json.name,
        username: json.username,
        email: json.email,
        photo: json.photo,
      };
      setUser(user);
      const imageUrl = `http://localhost:5000/uploads/${json.photo}`;
      //console.log(imageUrl);
      setImagesrc(imageUrl);
    };

    if (authtoken) {
      fetchUserImage();
    }
  }, [authtoken]);

  const [show, setShow] = useState(false);
  const showuserprofile = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <nav className="navbar2">
      <div className="leftIcons">
        <span className="mailicon">
          <img
            src={message}
            onClick={props.handlemeetclick}
            alt="mail"
            width="36px"
            style={
              props.darkTheme === "DarkTheme"
                ? { filter: "invert(100%)" }
                : { filter: "invert(0%)" }
            }
          />
        </span>
        <span className="bellicon">
          <img
            src={notifications}
            alt="notis"
            width="36px"
            style={
              props.darkTheme === "DarkTheme"
                ? { filter: "invert(100%)" }
                : { filter: "invert(0%)" }
            }
          />
        </span>
      </div>
      <div className="rightContent">
        <span className="userName">{user.name}</span>
        <span className="userdp">
          <img
            src={imagesrc !== "" ? imagesrc : dp}
            alt="dp"
            className="dp_element"
            style={{ width: "53px", borderRadius: "50%", cursor: "pointer" }}
            onClick={showuserprofile}
            onBlur={showuserprofile}
          />
        </span>
      </div>
          {show && <Userdetail user={user} id="userdetail" darkTheme={props.darkTheme} showuserprofile={showuserprofile}/>}
    </nav>
  );
};

export default UserNav;
