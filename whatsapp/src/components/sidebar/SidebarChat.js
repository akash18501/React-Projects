import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import "./sidebar.css";
import "./sidebarChat.css";
import db from "../../firebase";
import { Add } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [id]);

  console.log("messages in side bar is", messages);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("please enter the name for room");

    if (roomName) {
      //do some stuff witht the database
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return (
    <NavLink to={`/room/${id}`}>
      {!addNewChat ? (
        <div className="sidebarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      ) : (
        <div onClick={createChat} className="sidebarChat">
          <div className="add__new__chat">
            <h2>Create new chat room</h2>
            <IconButton>
              <Add />
            </IconButton>
          </div>
        </div>
      )}
    </NavLink>
  );
};

export default SidebarChat;
