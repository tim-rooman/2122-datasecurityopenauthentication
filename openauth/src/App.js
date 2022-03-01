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
  const [personalMessage, setPersonalMessage] = useState("");

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
      {user ? <h1>Greetings, {user.displayName} </h1> : <h1>Please log in</h1>}
      {user ? (
        <div className="flexContainer">
          <div className="infoBox">
            <img src={user.photoURL} alt="User profile" />
            <p>
              <strong>Displayname:</strong> {user.displayName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Saved message:</strong> none
            </p>
          </div>
          <div className="enterMessageBox">
            <p>Please enter a message to save</p>
            <input
              onChange={(event) => setPersonalMessage(event.target.value)}
              placeholder={"Enter a message that you want to save"}
            />
            <button>Save message</button>
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
