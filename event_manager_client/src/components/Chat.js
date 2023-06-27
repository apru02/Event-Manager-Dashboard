import React, { useState, useEffect, useContext, useRef } from "react";
import eventContext from "../Context/EventContext";
import Message from "./Message";
import sendicon from "./logos/send.png";

const Chat = (props) => {
  const context = useContext(eventContext);
  const { curruser, getUserDetails } = context;

  const event = props.event;
  const host = "http://localhost:5000";
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
      console.log(json.chats);
    } else {
      setchats(chatsInitial);
    }
  };

  const scrollChatContentToBottom = () => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = chatContentRef.current;
    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
    shouldScrollToBottomRef.current = isScrolledToBottom;
  };

  return (
    <div className="chatcomponent">
      <div className="groupname">
        <h1>{event.title}</h1>
      </div>
      <div className="chatcontent" ref={chatContentRef} onScroll={handleScroll}>
        {mychats.length > 0 ? (
          mychats.map((chat) => <Message chat={chat} user={curruser} />)
        ) : (
          <p>No chats to show</p>
        )}
      </div>
      <div className="inputmsgrow">
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
        />
        <img
          src={sendicon}
          style={{ width: "30px" }}
          className="senticon"
          onClick={onsendmessage}
          alt=""
        />
      </div>
    </div>
  );
};

export default Chat;
