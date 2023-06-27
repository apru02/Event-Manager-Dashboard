import React from "react";
import "../App.css";
const Message = (props) => {

    const utcDateStr = props.chat.date;
    const utcDate = new Date(utcDateStr);
    
    // Extract time in IST
    const hours = utcDate.getHours();
    const minutes = utcDate.getMinutes();
    const timeInIST = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    
    const msgtime = timeInIST; // Output: 00:34
    

  return (
    <div
      className="msg_row"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent:
          props.user._id === props.chat.user_id ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="msgbox"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p className="chatUserName">{props.chat.name}</p>
        <p className="chatmsg">{props.chat.message}</p>
        <p className="chatTime">{msgtime}</p>
      </div>
    </div>
  );
};

export default Message;
