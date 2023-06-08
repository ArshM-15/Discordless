import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config.js";
import { useLocation } from "react-router";

const Chatroom = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();

  const room = location.state.room;

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    if (room) {
      const queryMessages = query(
        messagesRef,
        where("room", "==", room),
        orderBy("createdAt")
      );
      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!room || newMessage.trim() === "") return;

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
    } catch (error) {
      console.log("Error adding message: ", error);
    }

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div>
        {messages.map((message) => (
          <h1 key={message.id}>{message.text}</h1>
        ))}
      </div>
      <form className="new-message" onSubmit={handleSubmit}>
        <input
          className="new-message-input"
          placeholder="Enter your message here.."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatroom;
