import React, { useState, useEffect, useContext, useRef } from "react";
import eventContext from "../Context/EventContext";
import Message from "./Message";
import sendicon from "./logos/send.png";
const {host} = require("../env.js");
const Chat = (props) => {
  const context = useContext(eventContext);
  const { curruser, getUserDetails } = context;

  const event = props.event;
  //const host = "http://localhost:5000";
  const chatsInitial = [];
  const [mychats, setchats] = useState(chatsInitial);
  const [message, setmessage] = useState("");
  let authtoken = localStorage.getItem("token");
  const chatContentRef = useRef(null);
  const shouldScrollToBottomRef = useRef(true);

  const onchange = (e) => {
    setmessage(e.target.value);
  };

  const onsendmessage = async (e) => {
    e.preventDefault();
    const event_id = event._id;
    if (message !== "") {
      const response = await fetch(`${host}/api/chat/createchat/${event_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authtoken,
        },
        body: JSON.stringify({
          message: message,
        }),
      });
      const json = await response.json();
      console.log(json.chats);
      getChats();
      setmessage("");
      scrollChatContentToBottom();
    }
  };

  useEffect(() => {
    if (authtoken && event) {
      getChats();
      getUserDetails();
      console.log(curruser);

      const interval = setInterval(() => {
        getChats();
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setchats(chatsInitial);
    }
    // eslint-disable-next-line
  }, [authtoken, event]);

  useEffect(() => {
    if (shouldScrollToBottomRef.current) {
      scrollChatContentToBottom();
    }
  }, [mychats]);

  const getChats = async () => {
    const event_id = event._id;
    const response = await fetch(`${host}/api/chat/getchats/${event_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    if (json.success) {
      setchats(json.chats.chats);
     // console.log(json.chats);
    } else {
      setchats(chatsInitial);
    }
  };

  const scrollChatContentToBottom = () => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  };

  const addDateDividers = () => {
    const formattedChats = [];
    let currentDate = null;

    for (let i = 0; i < mychats.length; i++) {
      const chat = mychats[i];
      const chatDate = new Date(chat.date).toDateString();

      if (currentDate !== chatDate) {
        formattedChats.push({
          ...chat,
          isDateDivider: true,
        });
        currentDate = chatDate;
      } else {
        formattedChats.push(chat);
      }
    }

    return formattedChats;
  };

  const formattedChats = addDateDividers();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = chatContentRef.current;
    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
    shouldScrollToBottomRef.current = isScrolledToBottom;
  };

  return (
    <div className="chatcomponent">
      <div className="groupname" style={
            props.darkTheme === "DarkTheme" ? { backgroundColor: "#202c33" } : {}
          }>
        <h1
          
        >
          {event.title}
        </h1>
      </div>
      <div className="chatcontent" ref={chatContentRef} onScroll={handleScroll}>
        {formattedChats.length > 0 ? (
          formattedChats.map((chat, index) => (
            <Message
              chat={chat}
              user={curruser}
              key={`message-${index}`}
              darkTheme={props.darkTheme}
            />
          ))
        ) : (
          <p>No chats to show</p>
        )}
      </div>
      <div
        className="inputmsgrow"
        style={
          props.darkTheme === "DarkTheme"
            ? { backgroundColor: "#202c33", boxShadow: "none" }
            : {}
        }
      >
        <input
          type="text"
          className="inputmsg"
          value={message}
          onChange={onchange}
          placeholder="Type a message"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onsendmessage(e);
            }
          }}
          style={
            props.darkTheme === "DarkTheme"
              ? { backgroundColor: "#2a3942", color: "white" }
              : {}
          }
        />
        <img
          src={sendicon}
          className="senticon"
          onClick={onsendmessage}
          alt=""
          style={
            props.darkTheme === "DarkTheme"
              ? { filter: "invert(1)", width: "30px" }
              : { width: "30px" }
          }
        />
      </div>
    </div>
  );
};

export default Chat;
