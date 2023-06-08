import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase/firebase-config.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const cookies = new Cookies();

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setLoggedIn(true);
    } catch (error) {
      console.log("Error signing in with Google:", error);
      alert(
        "An error occurred while signing in with Google. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/home", { state: { loggedIn, setLoggedIn } });
    }
  }, [loggedIn, navigate]);

  return (
    <div className="signIn">
      <div className="ball1"></div>
      <div className="container">
        <h1>Sign-In Here</h1>
        <button onClick={handleSignInWithGoogle}>Sign-In with Google</button>
      </div>
      <div className="ball2"></div>
    </div>
  );
};

export default Login;
