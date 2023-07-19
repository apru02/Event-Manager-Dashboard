import React from "react";
import success from "./logos/checked.png"
import warning from "./logos/warning.png"
import danger from "./logos/alert.png"
import "../App.css"; // Import the CSS file
const Alert = (props) => {
    let icon = success;
    if (props.type === "success") { 
        icon = success;
    }
    if (props.type === "warning") {
        icon = warning;
    }
    if (props.type === "danger") {
        icon = danger;
    }

  return (
    <>
    
      <div
        class={`alert alert-${props.type} d-flex align-items-center`}
        role="alert"
      >
        <img src={icon} style={{width:"20px"}} alt="" />
        <div>{props.message}</div>
      </div>
    </>
  );
};

export default Alert;
