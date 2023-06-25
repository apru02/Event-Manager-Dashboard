import React, { useState, useEffect } from "react";
import message from "./logos/mail.png";
import notifications from "./logos/bell.png";
import dp from "./logos/user.png";
import Userdetail from "./Userdetail";
const UserNav = () => {
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
      console.log(json);
      const user = {
        id: json._id,
        name: json.name,
        username: json.username,
        email: json.email,
        photo: json.photo,
      };
      setUser(user);
      const imageUrl = `http://localhost:5000/uploads/${json.photo}`;
      console.log(imageUrl);
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
      <span className="mailicon">
        <img src={message} alt="mail" width="36px" />
      </span>
      <span className="bellicon">
        <img src={notifications} alt="notis" width="36px" />
      </span>
      <span className="userName">{user.name}</span>
      <span className="userdp">
        <img
          src={imagesrc !== "" ? imagesrc : dp}
          alt="dp"
          style={{ width: "53px", borderRadius: "50%",cursor:"pointer" }}
          onClick={showuserprofile}

        />
        {show && <Userdetail user={user} id="userdetail" />}
      </span>
    </nav>
  );
};

export default UserNav;
