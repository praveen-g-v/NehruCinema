import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Footer from "../HeaderAndFooter/Footer";
import Header from "../HeaderAndFooter/Header";

const Home = ({ isLoading }) => {
  useEffect(() => {
    var root = document.getElementById("root");
    root.style = isLoading ? "overflow:hidden" : "";
    // console.log(root);
  }, [isLoading]);
  return (
    <>
      <Header />
      <Outlet />
      <div className="p-2"></div>
      <Footer />
    </>
  );
};

export default Home;
