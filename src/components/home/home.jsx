// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { db, auth } from "../firebase/firebase-config.js";
// import { useState, useEffect } from "react";
// import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";

// const Home = () => {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setMessages(data);
//     });

//     return unsubscribe;
//   }, []);

//   const sendMessage = async (event) => {
//     event.preventDefault();

//     if (newMessage === "") {
//       alert("Please enter a valid message");
//     } else {
//       await addDoc(collection(db, "messages"), {
//         message: newMessage,
//       });
//     }
//     setNewMessage("");
//   };

//   const signout = async () => {
//     await signOut(auth);
//     navigate("/");
//   };

//   return (
//     <div className="home">
//       <button onClick={signout}>Sign Out</button>
//       <h1>Home</h1>
//       <form>
//         <input
//           maxLength="10"
//           placeholder="Enter a new message.."
//           value={newMessage}
//           onChange={(event) => {
//             setNewMessage(event.target.value);
//           }}
//         />
//         <button type="submit" onClick={sendMessage}>
//           Submit
//         </button>
//       </form>
//       <ul>
//         {messages.map((message) => (
//           <h2 key={message.id}>{message.message}</h2>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
