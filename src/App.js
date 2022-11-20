import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);


function App() {
  const [user, setUser] = useState({})

  const Provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, Provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({})
      })
  }

  return (
    <div className="App">
      {user.email ?
        <button onClick={handleSignOut}>Sign Out</button>
        :
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      {user.email &&
        <div>
        <h3>User Name: {user.displayName}</h3>
        <p>Email: {user.email}</p>
        <img src={user.photoURL} alt='userIMG'></img>
      </div>}
    </div>
  );
}

export default App;
