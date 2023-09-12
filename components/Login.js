import React, { useContext, useState } from "react";
import { useAuth } from "@/context/AuthContext";

function Login() {
  const { login, signUp, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

/**
 * The function handles form submission by checking if the email and password fields are filled, and
 * then either logging in or signing up the user.
 * @param event - The event parameter is the event object that is passed to the handleSubmit function
 * when it is called. It contains information about the event that triggered the function, such as the
 * form submission event.
 * @returns The function does not explicitly return anything.
 */
  async function handleSubmit(event) {
    /* `event.preventDefault()` is a method in JavaScript that is used to prevent the default behavior
    of an event. In the context of this code, it is used to prevent the default form submission
    behavior when the form is submitted. */
    event.preventDefault();
    if (!email || !password) {
      setError("Inserisci email e password.");
      return;
    }

    try {
      if (isFirstTime) { 
        await login(email, password); } 
      else { 
        await signUp(email, password); }
    } 
    catch (error) { 
      setError("Credenziali non valide.");}
  }

  return (
    <div className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-4 sm:gap-2">
      <h1 className="font-extrabold select-none text-2xl sm:text-4xl uppercase">
        {isFirstTime ? "Login" : "Registrati"}
      </h1>
      {error && (
        <div className="w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-300 py-2">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-[40ch]">
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Indirizzo Email..."
            className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="outline-none text-slate-900 p-2 w-full duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
          />
        </div>
        <button
          type="submit"
          className="w-full border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
        >
          <h2 className="relative z-20">INVIA</h2>
        </button>
      </form>
      <h2
        className="duration-300 hover:scale-110 cursor-pointer"
        onClick={() => setIsFirstTime(!isFirstTime)}
      >
        {!isFirstTime ? "Login" : "Registrati"}
      </h2>
    </div>
  );
}

export default Login;
