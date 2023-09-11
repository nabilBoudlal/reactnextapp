import React from "react";
import Head from "next/head";
import Login from "../components/Login";
import { useAuth } from "@/context/AuthContext";
import UserDashboard from "@/components/UserDashboard";

/**
 * The Home function checks if there is a current user and renders either the Login component or the
 * UserDashboard component accordingly.
 * @returns The Home component returns either the Login component or the UserDashboard component based
 * on whether there is a currentUser or not.
 */
function Home() {
  const { currentUser } = useAuth();
  return (
    <>
      {!currentUser && <Login />}
      {currentUser && <UserDashboard />}
    </>
  );
}

export default Home;
