import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Footer from "../HeaderAndFooter/Footer";
import Header from "../HeaderAndFooter/Header";
import useAuth from "../../hooks/useAuth";
import { AppToastContainer } from "../../utils/toast.js";
const Home = ({ isLoading }) => {
  const { user, setUser, setAuth } = useAuth();
  useEffect(() => {
    var root = document.getElementById("root");
    root.style = isLoading ? "overflow:hidden" : "";
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    console.log("Stored User:", storedUser);
    console.log("Stored Token:", storedToken);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setAuth(storedToken);
    }
    // console.log(root);
  }, [isLoading]);
  return (
    <>
      <Header />
      <div className="p-2 mb-20"></div>
      <AppToastContainer />
      <Outlet />
      <div className="p-2 mb-40"></div>
      <Footer />
    </>
  );
};

export default Home;
