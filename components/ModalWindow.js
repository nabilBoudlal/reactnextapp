import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal(props) {
  const { setOpenModal } = props;
  const [_document, set_document] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    set_document(document);
  }, []);

  /* This code block is a conditional rendering statement. It checks if the `_document` variable is
  null or not. If `_document` is null, it returns `null`, which means nothing will be rendered. If
  `_document` is not null, it uses `ReactDOM.createPortal()` to create a portal and render the JSX
  code inside it. */
  if (!_document) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="fixed w-screen h-screen top-0 left-0 bg-white text-slate-900 text-lg sm:text-xl felx flex-col">
      <div className="flex items-center justify-between border-b border-solid border-slate-900 p-4">
        <h1 className="font-extrabold text-2xl sm:text-5xl select-none">
          Menu
        </h1>
        <i
          onClick={() => setOpenModal(false)}
          className="fa-solid fa-xmark cursor-pointer"
        ></i>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h2
          onClick={() => {
            logout();
            setOpenModal(false);
          }}
          className="select-none duration-300 hover:pl-2 cursor-pointer"
        >
          Logout
        </h2>
      </div>
    </div>,
    _document.getElementById("portal")
  );
}
