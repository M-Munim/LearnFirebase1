import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // let UserEmail = console.log(auth?.currentUser?.email);
  let UserEmail = auth?.currentUser?.email;
  // let UserPic = console.log(auth?.currentUser?.photoURL);
  let UserPic = auth?.currentUser?.photoURL;

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setEmail(""); // Reset email input
      setPassword(""); // Reset password input
      alert('Sign-in successful!');
    } catch (err) {
      console.error(err);
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      setEmail(""); // Reset email input
      setPassword(""); // Reset password input
      alert('Sign-in successful!');
    } catch (err) {
      console.error(err);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setEmail(""); // Reset email input
      setPassword(""); // Reset password input
      alert('Sign-Out successful!');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} /> <br /> <br />
      <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br /> <br />
      <button onClick={signIn}>Sign In</button > &nbsp;
      <button onClick={signInWithGoogle}>Sign In With Google</button > &nbsp;
      <button onClick={logout}>Sign Out</button>

      {UserEmail === undefined ?
        <h1>NO user</h1> :
        <>
          <h1> {UserEmail}</h1>
          <img src={UserPic} alt="UserPic" />
        </>}
    </>
  )
}

export default Auth