import React, { useState } from "react";

function ReminderCard(props) {
  const {
    reminder,
    handleEditReminder,
    handleDeleteReminder,
    handleToggleCompletion,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(reminder.text);
  
/**
 * The handleSaveEdit function sets the isEditing state to false and calls the handleEditReminder
 * function with the reminder id and editedValue as arguments.
 */
  const handleSaveEdit = () => {
    setIsEditing(false);
    handleEditReminder(reminder.id, editedValue);
  };

  return (
    <div className={`p-2 border relative sm:p-3 flex items-center border-white border-solid ${reminder.completed ? "opacity-50" : ""}`}>
      <div className="flex-1 flex text-xl font-normal uppercase">
        {!isEditing ? (
          <div>{reminder.text}</div>
        ) : (
          <input
            className="bg-inherit flex-1 text-white  outline-none"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
        )}
      </div>
      <div className="flex items-center">
        {isEditing ? (
          <i
            onClick={handleSaveEdit}
            className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={() => setIsEditing(true)}
            className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"
          ></i>
        )}
        <i
          onClick={() => handleDeleteReminder(reminder.id)}
          className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"
        ></i>
        <i
          onClick={() => handleToggleCompletion(reminder.id, reminder.completed)}
          className={`fa-solid ${reminder.completed ? "fa-check-circle text-green-500" : "fa-circle"} px-2 duration-300 hover:scale-125 cursor-pointer`}
        ></i>
      </div>
    </div>
  );
}

export default ReminderCard;
