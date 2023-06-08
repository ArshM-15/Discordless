import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config.js";
import { useNavigate, useLocation } from "react-router-dom";
import "./home.scss";

const cookies = new Cookies();

const Home = () => {
  const roomInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(true);
  const [room, setRoom] = useState("");

  useEffect(() => {
    const authToken = cookies.get("auth-token");
    setLoggedIn(!!authToken);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("room", room);
  }, [room]);

  const handleEnterChat = () => {
    const roomName = roomInputRef.current.value;
    if (roomName.trim() !== "") {
      setRoom(roomName);
      navigate("/chatroom", { state: { room: roomName } });
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="chooseRoom">
      <div className="container">
        <div>
          <h1>Enter Server Name:</h1>
        </div>
        <input ref={roomInputRef} maxLength="12" />
        <button onClick={handleEnterChat}>Enter Chat</button>
      </div>
    </div>
  );
};

export default Home;
