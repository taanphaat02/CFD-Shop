import React from "react";
import { useMainContext } from "../../context/MainContext";
import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";

const Header = () => {
  return (
    <header className="header">
      <HeaderTop />
      <HeaderMiddle />
    </header>
  );
};

export default Header;
