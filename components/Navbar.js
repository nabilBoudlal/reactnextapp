import React, { useEffect, useState } from "react";
import Modal from "./ModalWindow";


/**
 * The Navbar function is a React component that renders a sticky navigation bar with a title and a
 * user icon that opens a modal when clicked.
 * @returns The Navbar component is returning a JSX element.
 */
export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div
        className="sticky top-0 w-full left-0 flex items-center justify-between 
        p-4  border-b border-solid border-white"
      >
        <h1 className="text-3xl select-none sm:text-6xl">ReactReminder</h1>
        <i
          onClick={() => setOpenModal(true)}
          className="fa-solid fa-user text-xl duration-300
             hover:opacity-40 cursor-pointer sm:text-3xl"
        ></i>
      </div>
    </>
  );
}
