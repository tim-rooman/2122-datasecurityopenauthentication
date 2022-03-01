import React, { useState } from "react";
import "./App.css";
import { authentication } from "./firebase-config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

function App() {
  const [user, setUSer] = useState(null);
  const auth = getAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        // const credential = GoogleAuthProvider.credentialFromResult(re);
        // const token = credential.accessToken;
        setUSer(re.user);
        const user = re.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signOutFromGoogle = () => {
    signOut(auth)
      .then(() => {
        setUSer(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className="header">
        <span>Home</span>
        {user ? <img src={user.photoURL} alt="User profile" /> : null}
      </div>
      {user ? (
        <h1>Greetings, {user.displayName} </h1>
      ) : (
        <span>Please log in</span>
      )}
      {user ? (
        <div className="flexContainer">
          <div className="infoBox">
            <img src={user.photoURL} alt="User profile" />
            <p>Your displayname is: {user.displayName}</p>
            <p>Your email is: {user.email}</p>
          </div>
        </div>
      ) : null}
      {user ? (
        <button onClick={signOutFromGoogle} className="login-with-google-btn">
          Log out
        </button>
      ) : (
        <button onClick={signInWithGoogle} className="login-with-google-btn">
          Log in with Google
        </button>
      )}
    </div>
  );
}

export default App;
