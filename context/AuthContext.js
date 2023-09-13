import React, { useContext, useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() { return useContext(AuthContext);}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();


  /**
   * The function `signUp` is an asynchronous function that takes an email and password as parameters
   * and attempts to create a new user with the provided email and password using the
   * `createUserWithEmailAndPassword` method.
   * @param email - The email parameter is a string that represents the user's email address. It is
   * used to create a new user account.
   * @param password - The password parameter is the password that the user wants to set for their
   * account.
   */
  async function signUp(email, password) {
    try {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        const user = userCredential.user;
      });
    } catch (error) {
      throw error;
    }
  }


/**
 * The login function is an asynchronous function that takes an email and password as parameters and
 * attempts to sign in the user with the provided credentials.
 * @param email - The email parameter is the email address that the user enters during the login
 * process. It is used to identify the user and authenticate their account.
 * @param password - The `password` parameter is the password entered by the user during the login
 * process.
 */
  async function login(email, password) {
    try {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>
      {
        const user = userCredential.user;
      });
      
    } catch (error) {
      throw error;
    }
  }

/**
 * The `logout` function is an asynchronous function that attempts to sign out the user and throws an
 * error if there is any.
 */
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

/* the `useEffect` hook is used to handle the state of the authenticated user. */
  useEffect(() => {
   /* The `onAuthStateChanged` function is a listener provided by Firebase Authentication. It listens
   for changes in the authentication state, such as when a user signs in or signs out. */
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Pulizia dell'effetto all'uscita
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    userInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
