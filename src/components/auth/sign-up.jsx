import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("User registered:", userCredential.user);
      navigate("/"); // Navigate to login page after successful sign-up
    } catch (error) {
      console.log("Error registering user:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="signUp">
      <h3>Create User</h3>
      <input
        maxLength="40"
        placeholder="Email..."
        value={registerEmail}
        onChange={(event) => setRegisterEmail(event.target.value)}
      />
      <input
        maxLength="40"
        placeholder="Password..."
        value={registerPassword}
        onChange={(event) => setRegisterPassword(event.target.value)}
      />
      <button type="submit" onClick={register}>
        Create
      </button>
    </div>
  );
};

export default SignUp;
