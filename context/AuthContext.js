import React, { useContext, useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

  // Funzione per la registrazione di un nuovo utente con email e password
  async function signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Puoi aggiungere ulteriori operazioni qui, come l'aggiornamento del profilo utente.
    } catch (error) {
      throw error;
    }
  }

  // Funzione per l'accesso con email e password
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Puoi eseguire azioni aggiuntive qui, ad esempio caricare le informazioni dell'utente.
    } catch (error) {
      throw error;
    }
  }

  // Funzione per il logout
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    // Effetto per gestire lo stato dell'utente autenticato
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
