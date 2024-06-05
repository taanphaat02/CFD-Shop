import React from "react";
import { useMainContext } from "../../context/MainContext";

const Overlay = () => {
  const { handleCloseMobileMenuShow } = useMainContext();
  return (
    <div className="mobile-menu-overlay" onClick={handleCloseMobileMenuShow} />
  );
};

export default Overlay;
