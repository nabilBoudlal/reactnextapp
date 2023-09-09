import React from "react";
import Head from "next/head";
import Login from "../components/Login";
import { useAuth } from "@/context/AuthContext";
import UserDashboard from "@/components/UserDashboard";

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
