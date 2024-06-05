import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { MenuStyled } from "../StyledComponents";
import useHeaderMiddle from "./useHeaderMiddle";
import Search from "../Search";
import CartDropDown from "../CartDropDown";

const HeaderMiddle = () => {
  const { handleShowMobileMenuShow, cartDropdownProps } = useHeaderMiddle();

  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button
            className="mobile-menu-toggler"
            onClick={handleShowMobileMenuShow}
          >
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <Link to={PATHS.HOME} className="logo">
            <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
          </Link>
        </div>
        <nav className="main-nav">
          <MenuStyled className="menu">
            <li>
              <NavLink to={PATHS.HOME}>Home</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </MenuStyled>
        </nav>
        <div className="header-right">
          <Search />
          <CartDropDown {...cartDropdownProps} />
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
