import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
  MicIcon,
  Mic,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./chat.css";
import db from "../../firebase";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase";

const Chat = ({ user }) => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomid } = useParams();
  const [roomname, setRoomname] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomid) {
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => {
          setRoomname(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomid]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomid]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed", input);

    db.collection("rooms").doc(roomid).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h2>{roomname}</h2>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            <span>{message.message}</span>
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}

        {/* <p className="chat__message chat__receiver">
          <span className="chat__name">Akash parit</span>
          <span> Hello there how ya're all donig'!!!</span>
          <span className="chat__timestamp">12:15pm</span>
        </p> */}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="type a message here"
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, null)(Chat);
