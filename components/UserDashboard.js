import React, { useState, useEffect } from "react";
import ReminderCard from "./ReminderCard";
import { onSnapshot,doc, addDoc, setDoc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "@/context/AuthContext";

function UserDashboard() {
  const { userInfo, currentUser } = useAuth();
  const [newReminderText, setNewReminderText] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const userReminderPath = `users/${currentUser.uid}/reminders`;
      const reminderCollection = collection(db, userReminderPath);

      const unsubscribe = onSnapshot(reminderCollection, (snapshot) => {
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

  async function handleAddReminder() {
    if (!newReminderText) {
      return;
    }

    try {
      const userReminderPath = `users/${currentUser.uid}/reminders`;
      const reminderCollection = collection(db, userReminderPath);

      await addDoc(reminderCollection, {
        text: newReminderText,
        completed: false,
      });

      setNewReminderText("");
    } catch (error) {
      console.error("Errore durante l'aggiunta del reminder:", error);
    }
  }

  async function handleEditReminder(reminderId, newText) {
    if (!newText) {
      return;
    }

    try {
      const userReminderPath = `users/${currentUser.uid}/reminders`;
      const reminderRef = doc(db, userReminderPath, reminderId);
      await updateDoc(reminderRef, { text: newText });
    } catch (error) {
      console.error("Errore durante la modifica del reminder:", error);
    }
  }

  async function handleDeleteReminder(reminderId) {
    try {
      const userReminderPath = `users/${currentUser.uid}/reminders`;
      const reminderRef = doc(db, userReminderPath, reminderId);
      await deleteDoc(reminderRef);
    } catch (error) {
      console.error("Errore durante l'eliminazione del reminder:", error);
    }
  }

  async function handleToggleCompletion(reminderId, completed) {
    try {
      const userReminderPath = `users/${currentUser.uid}/reminders`;
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
          className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40"
        >
          AGGIUNGI
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
