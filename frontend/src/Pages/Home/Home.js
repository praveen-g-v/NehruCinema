import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../HeaderAndFooter/Footer";
import Header from "../HeaderAndFooter/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
