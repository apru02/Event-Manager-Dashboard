import React from "react";
import editicon from "./logos/edit.png";
import logout from "./logos/logout.png";
import adduser from "./logos/add-user.png";
import { useNavigate } from "react-router-dom";
import "../App.css";
const Userdetail = (props) => {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  const handlenewaccount = () => {
   // localStorage.removeItem("token");
    navigate("/signup");
  };
const handleEditAccount = () => {
    navigate("/editaccount");
    };
  const imgsrc = `http://localhost:5000/uploads/${props.user.photo}`;
  return (
    <div className="userdetail">
      <div className="pprow1">
        <img
          src={imgsrc}
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          alt="dp"
          className="dp"
        />
        <p style={{marginBottom: "0rem"}}>{props.user.name}</p>
      </div>
      <hr />
      <div className="ppmain">
        <div className="dprow">
          <img
            src={editicon}
            width="30px"
            height="30px"
            alt="dp"
            className="dp"
            onClick={handleEditAccount}
          />
          <p onClick={handleEditAccount}>Edit Acocunt Settings</p>
        </div>
        <div className="dprow">
          <img
            src={logout}
            width="30px"
            height="30px"
            alt="dp"
            className="dp"
            onClick={handlelogout}
          />
          <p onClick={handlelogout}>Log Out</p>
        </div>
        <div className="dprow">
          <img
            src={adduser}
            width="30px"
            height="30px"
            alt="dp"
            className="dp"
            onClick={handlenewaccount}
          />
          <p onClick={handlenewaccount}>Create new account</p>
        </div>
      </div>
    </div>
  );
};

export default Userdetail;