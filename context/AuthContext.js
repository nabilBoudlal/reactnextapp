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
 * The function `signUp` is used to register a new user with an email and password.
 * @param email - The email parameter is a string that represents the email address of the user who
 * wants to sign up.
 * @param password - The password parameter is the password that the user wants to set for their
 * account.
 */
  async function signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
    } catch (error) {
      throw error;
    }
  }

/**
 * The login function is an asynchronous function that takes an email and password as parameters,
 * attempts to sign in with the provided credentials, and returns the user object if successful.
 * @param email - The email parameter is the email address of the user trying to log in.
 * @param password - The `password` parameter is the password entered by the user during the login
 * process.
 */
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
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
