import React, { useState, useEffect } from "react";
import "./App.css";
import { authentication, db } from "./firebase-config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [user, setUSer] = useState(null);
  const [personalMessage, setPersonalMessage] = useState("");
  const [gender, setGender] = useState("");
  const [haveSavedMessage, setHaveSavedMessage] = useState("");
  const [haveGenderMale, setHaveGenderMale] = useState("");
  const [haveGenderFemale, setHaveGenderFemale] = useState("");
  const [haveGenderOther, setHaveGenderOther] = useState("");
  const [loadedSavedMessage, setLoadedSavedMessage] = useState("");
  const [loadedSavedGender, setLoadedSavedGender] = useState("");

  const auth = getAuth();

  useEffect(() => {
    countUsers();
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      getUserInfo();
    } else {
      console.log("No user is logged in.");
    }
  });

  async function countUsers() {
    const qMessage = query(
      collection(db, "Users"),
      where("savedMessage", "!=", "empty")
    );
    const messageSnapshot = await getDocs(qMessage);
    setHaveSavedMessage(messageSnapshot.size);

    const qGenderMale = query(
      collection(db, "Users"),
      where("gender", "==", "man")
    );
    const maleSnapshot = await getDocs(qGenderMale);
    setHaveGenderMale(maleSnapshot.size);

    const qGenderFemale = query(
      collection(db, "Users"),
      where("gender", "==", "woman")
    );
    const femaleSnapshot = await getDocs(qGenderFemale);
    setHaveGenderFemale(femaleSnapshot.size);

    const qGenderOther = query(
      collection(db, "Users"),
      where("gender", "==", "other")
    );
    const otherSnapshot = await getDocs(qGenderOther);
    setHaveGenderOther(otherSnapshot.size);
  }

  async function getUserInfo() {
    const qUser = query(collection(db, "Users"), where("User", "==", user.uid));
    const userSnapshot = await getDocs(qUser);
    userSnapshot.forEach((doc) => {
      loadedSavedMessage === ""
        ? setLoadedSavedMessage("/")
        : setLoadedSavedMessage(doc.data().savedMessage);
      loadedSavedGender === ""
        ? setLoadedSavedGender("/")
        : setLoadedSavedGender(doc.data().gender);
    });
  }

  async function addUserData() {
    addDoc(collection(db, "Users"), {
      savedMessage: personalMessage,
      gender: gender,
      User: user.uid,
    });
    /*const qUpdateData = query(
        collection(db, "Users"),
        where("User", "==", user.uid)
      );
      await updateDoc(qUpdateData, {
        savedMessage: personalMessage,
        gender: gender,
      });*/
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        // const credential = GoogleAuthProvider.credentialFromResult(re);
        // const token = credential.accessToken;
        setUSer(re.user);
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
      <div>
        <p>So far {haveSavedMessage} users saved a message.</p>
        <p>
          {haveGenderMale} of the users are men, {haveGenderFemale} woman and{" "}
          {haveGenderOther} other
        </p>
      </div>
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
              <strong>Saved message:</strong>{" "}
              {loadedSavedMessage !== "empty" ? loadedSavedMessage : "/"}
            </p>
            <p>
              <strong>Your gender:</strong>{" "}
              {loadedSavedGender !== "empty" ? loadedSavedGender : "/"}
            </p>
          </div>
          <div className="enterMessageBox">
            <p>Please enter a message to save</p>
            <input
              onChange={(event) => setPersonalMessage(event.target.value)}
              placeholder={"Enter a message that you want to save"}
            />
            <select onChange={(event) => setGender(event.target.value)}>
              <option disabled selected hidden>
                Select gender
              </option>
              <option value="man">man</option>
              <option value="woman">woman</option>
              <option value="other">other</option>
            </select>
            <button onClick={() => addUserData()}>Save data</button>
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
