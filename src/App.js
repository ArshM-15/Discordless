import { useRef, useState, useEffect } from "react";
import { Auth } from "./components/auth/auth";
import Cookies from "universal-cookie";
import Chatroom from "./components/chatroom/chatroom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase/firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(false); // Initialize with false
  const [room, setRoom] = useState(null); // Initialize with null

  const roomInputRef = useRef(null);

  useEffect(() => {
    const authToken = cookies.get("auth-token");
    setIsAuth(!!authToken); // Set isAuth based on the existence of "auth-token" cookie

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  useEffect(() => {
    localStorage.setItem("room", room); // Store the current room value in local storage
  }, [room]);

  if (!isAuth) {
    return (
      <div className="App">
        <Auth />
      </div>
    );
  }

  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
      localStorage.removeItem("room"); // Remove the stored room value when signing out
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {room ? (
        <Chatroom room={room} />
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}

      <div>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
