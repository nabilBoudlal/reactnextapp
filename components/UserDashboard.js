import React, { useState, useEffect } from "react";
import ReminderCard from "./ReminderCard";
import { onSnapshot,doc, addDoc, setDoc, updateDoc, deleteDoc, collection, where, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "@/context/AuthContext";

/* 
Regole accesso Firestore
 service cloud.firestore {
  match /databases/{database}/documents {
    // Autorizza l'accesso solo agli utenti autenticati
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      // Autorizza l'accesso ai reminder solo per l'utente corrente
      match /reminders/{reminderId} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
} */

function UserDashboard() {
  const { userInfo, currentUser } = useAuth();
  const [newReminderText, setNewReminderText] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userReminderPath = `users/${currentUser.uid}/reminders`;


  /* The `useEffect` hook is used to perform side effects in a functional component. 
  In this case, the effect is triggered whenever the `currentUser` value changes. */
  useEffect(() => {
    if (currentUser) {
      const reminderCollection = collection(db, userReminderPath);
      const q = query(reminderCollection, where("userUid", "==", currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const reminderData = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          reminderData.push({ id: doc.id, ...data });
        });
        setReminders(reminderData);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);
  

 
/**
 * The function `handleAddReminder` adds a new reminder to a collection in a database, with the
 * reminder text, completion status, and user UID.
 * @returns nothing (undefined).
 */
 async function handleAddReminder() {
  if (!newReminderText || newReminderText.trim() === "") {
    console.error("Il testo del reminder non è valido.");
    return;
  }
    try {
      const reminderCollection = collection(db, userReminderPath);
      await addDoc(reminderCollection, {
        text: newReminderText,
        completed: false,
        userUid:currentUser.uid
      });

      /*Is used to clear the input field after a new  reminder has been added. */
      setNewReminderText("");
    } catch (error) {
      console.error("Errore durante l'aggiunta del reminder:", error);
    }
  }

/**
 * The function `handleEditReminder` is an asynchronous function that updates the text of a reminder in
 * a Firestore database.
 * @param reminderId - The reminderId parameter is the unique identifier of the reminder that needs to
 * be edited. It is used to locate the specific reminder document in the database.
 * @param newText - The `newText` parameter is the new text that you want to update the reminder with.
 * It is a string value.
 * @returns If the `newText` parameter is falsy (empty, null, undefined, etc.), the function will
 * return without performing any further actions.
 */
  async function handleEditReminder(reminderId, newText) {
    if (!newText || newText == "") {
      console.error("Errore durante la modifica del reminder");
      return; }
    try {
      const reminderRef = doc(db, userReminderPath, reminderId);
      await updateDoc(reminderRef, { text: newText });
    } catch (error) {
      console.error("Errore durante la modifica del reminder:", error);
    }
  }

/**
 * The function `handleDeleteReminder` is an asynchronous function that deletes a reminder from a
 * user's collection in a Firestore database.
 * @param reminderId - The `reminderId` parameter is the unique identifier of the reminder that needs
 * to be deleted. It is used to locate the specific reminder document in the database and delete it.
 */
  async function handleDeleteReminder(reminderId) {
    try {
      const reminderRef = doc(db, userReminderPath, reminderId);
      await deleteDoc(reminderRef);
    } catch (error) {
      console.error("Errore durante l'eliminazione del reminder:", error);
    }
  }
  

/**
 * The function `handleToggleCompletion` toggles the completion status of a reminder in a user's
 * database.
 * @param reminderId - The reminderId parameter is the unique identifier of the reminder that needs to
 * be toggled. It is used to locate the specific reminder document in the database and update its
 * completion status.
 * @param completed - The `completed` parameter is a boolean value that represents the current
 * completion status of the reminder. It indicates whether the reminder is marked as completed or not.
 */
  async function handleToggleCompletion(reminderId, completed) {
    try {
      const reminderRef = doc(db, userReminderPath, reminderId);
      await updateDoc(reminderRef, { completed: !completed });
    } catch (error) {
      console.error("Errore durante il toggle del completamento del reminder:", error);
    }
  }


  return (
    <div className="w-full max-w-[65ch] mx-auto flex flex-col gap-3 sm:gap-5">
      <div className="flex items-center text-2xl sm:text-xl font-normal">Bentornato {currentUser.email}</div>
      <div className="flex items-stretch">
        <input
          type="text"
          placeholder="Inserisci un nuovo reminder..."
          value={newReminderText}
          onChange={(e) => setNewReminderText(e.target.value)}
          className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
        />
        <button
          onClick={handleAddReminder}
          className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-black font-extrabold text-base duration-300 hover:opacity-40"
        >
          +
        </button>
      </div>
      <div className="w-fit  sm:px-6 py-2 sm:py-3 text-white font-semibold text-base">Ecco i tuoi reminders</div>
      {loading && (
        <div className="flex-1 grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
        </div>
      )}
      {userInfo && !loading && (
        <>
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              handleEditReminder={handleEditReminder}
              handleDeleteReminder={handleDeleteReminder}
              handleToggleCompletion={handleToggleCompletion}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default UserDashboard;
