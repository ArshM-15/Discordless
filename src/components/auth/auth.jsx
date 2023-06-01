import { auth, provider } from "../firebase/firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signUp">
      <h2>Sign-In with Google</h2>
      <button onClick={signInWithGoogle}>Sign-In with Google</button>
    </div>
  );
};
