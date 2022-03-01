import React, { useState } from "react";
import "./App.css";
import { authentication } from "./firebase-config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [user, setUSer] = useState(null);
  const auth = getAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        const credential = GoogleAuthProvider.credentialFromResult(re);
        const token = credential.accessToken;
        setUSer(re.user);
        const user = re.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      {user ? <span>Hi {user.displayName} </span> : <span>Please log in</span>}
      {user ? (
        <div>
          {user.email} <img src={user.photoURL} />
        </div>
      ) : null}
      <button onClick={signInWithGoogle}>Log in with Google</button>
    </div>
  );
}

export default App;
