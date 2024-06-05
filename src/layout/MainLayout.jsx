import React from "react";
import MainContextProvider from "../context/MainContext";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "../context/AuthContext";
import ScrollTop from "../components/ScrollTop";
import AuthModal from "../components/AuthModal";
import MobileMenu from "../components/MobileMenu";
import Header from "../components/Header";
import Overlay from "../components/Overlay";

const MainLlayout = () => {
  return (
    <MainContextProvider>
      {/* <AuthContextProvider> */}
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <ScrollTop />
      <MobileMenu />
      <AuthModal />
      <Overlay />
      {/* </AuthContextProvider> */}
    </MainContextProvider>
  );
};

export default MainLlayout;
