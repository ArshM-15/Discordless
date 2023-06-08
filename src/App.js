import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/home/home.jsx";
import Chatroom from "./components/chatroom/chatroom.jsx";
import Login from "./components/auth/login.jsx";
import SignUp from "./components/auth/sign-up.jsx";
import { auth } from "./components/firebase/firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import logo from "./components/images/logo.png";
import "./App.scss";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [room, setRoom] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = cookies.get("auth-token");
    if (authToken) {
      setIsAuth(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
      localStorage.removeItem("room");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="navigation">
        <img src={logo} alt="logo" />
        <button onClick={signUserOut}>Sign Out</button>
      </div>
      <Routes location={location}>
        <Route
          exact
          path="/home"
          element={
            <Home
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              room={room}
              setRoom={setRoom}
            />
          }
        />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/chatroom" element={<Chatroom />} />
      </Routes>
    </div>
  );
}

export default App;
