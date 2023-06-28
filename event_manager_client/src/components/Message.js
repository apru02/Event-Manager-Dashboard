import React from "react";
import "../App.css";

const Message = (props) => {
  const utcDateStr = props.chat.date;
  const utcDate = new Date(utcDateStr);

  // Extract time in IST
  const hours = utcDate.getHours();
  const minutes = utcDate.getMinutes();
  const timeInIST = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
    //console.log(formattedDate);
    return formattedDate;
  };

  const msgtime = timeInIST; // Output: 00:34

  return (
    <div className="msginbox">

    {props.chat.isDateDivider && (
      <p className="chatDate">{formatDate(props.chat.date)}</p>
    )}
    <div
      className="msg_row"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent:
          props.user._id === props.chat.user_id ? "flex-end" : "flex-start",
      }}
    >
      {/* Render date divider if chat object contains date divider flag */}
      <div
        className="msgbox"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p className="chatUserName">{props.chat.name}</p>
        <p className="chatmsg">{props.chat.message}</p>
        <p className="chatTime">{msgtime}</p>
      </div>
    </div>
    </div>
  );
};

export default Message;
