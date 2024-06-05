import React, { useState } from "react";
import { useMainContext } from "../../context/MainContext";
import classNames from "classnames";
import cn from "../../utils/cn";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { MenuStyled } from "../StyledComponents";

const MENUS = {
  menu: "menu",
  cate: "categories",
};

const MobileMenu = () => {
  const { handleCloseMobileMenuShow } = useMainContext();

  const [selectedTab, setSelectedTab] = useState(MENUS.menu);
  const _onChangeTab = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };
  return (
    <div>
      <div
        className="mobile-menu-overlay"
        onClick={handleCloseMobileMenuShow}
      />
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span
            className="mobile-menu-close"
            onClick={handleCloseMobileMenuShow}
          >
            <i className="icon-close" />
          </span>
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.menu,
                })}
                onClick={(e) => _onChangeTab(e, MENUS.menu)}
                href="#mobile-menu-tab"
              >
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.cate,
                })}
                onClick={(e) => _onChangeTab(e, MENUS.cate)}
                href="#mobile-menu-tab"
              >
                Categories
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className={cn("tab-pane fade", {
                show: selectedTab === MENUS.menu,
                active: selectedTab === MENUS.menu,
              })}
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav">
                <MenuStyled className="mobile-menu">
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
              {/* End .mobile-nav */}
            </div>
            {/* .End .tab-pane */}
            <div
              className={cn("tab-pane fade", {
                show: selectedTab === MENUS.cate,
                active: selectedTab === MENUS.cate,
              })}
              id="mobile-cats-tab"
              role="tabpanel"
              aria-labelledby="mobile-cats-link"
            >
              <nav className="mobile-cats-nav">
                <ul className="mobile-cats-menu">
                  <li>
                    <Link to={PATHS.PRODUCTS}> TV</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRODUCTS}>Computers</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRODUCTS}>Tablets &amp; Cell Phones</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRODUCTS}>Smartwatches</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRODUCTS}>Accessories</Link>
                  </li>
                </ul>
                {/* End .mobile-cats-menu */}
              </nav>
              {/* End .mobile-cats-nav */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
          <div className="social-icons">
            <a
              href="https://www.facebook.com/cfdcircle"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f" />
            </a>
            <a
              href="https://x.com/"
              className="social-icon"
              target="_blank"
              title="Twitter"
            >
              <i className="icon-twitter" />
            </a>
            <a
              href="https://instagram.com/"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram" />
            </a>
            <a
              href="https://www.youtube.com/@CFDCircle"
              className="social-icon"
              target="_blank"
              title="Youtube"
            >
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
    </div>
  );
};

export default MobileMenu;
