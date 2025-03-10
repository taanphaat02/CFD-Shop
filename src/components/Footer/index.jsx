import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-5">
              <div className="widget widget-about">
                <img
                  src="/assets/images/logo.svg"
                  className="footer-logo"
                  alt="Footer Logo"
                  width={120}
                />
                <p>
                  Praesent dapibus, neque id cursus ucibus, tortor neque egestas
                  augue, eu vulputate magna eros eu erat.{" "}
                </p>
                <div className="widget-call">
                  <i className="icon-phone" /> Got Question? Call us 24/7{" "}
                  <a href="tel:#">098 9596 912</a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2 offset-lg-1">
              <div className="widget">
                <h4 className="widget-title">Useful Links</h4>
                <ul className="widget-list">
                  <li>
                    <Link to={PATHS.ABOUT}>About Us</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRODUCTS}>Product</Link>
                  </li>
                  <li>
                    <Link to={PATHS.FAQ}>FAQs</Link>
                  </li>
                  <li>
                    <Link to={PATHS.CONTACT}>Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="widget">
                <h4 className="widget-title">Customer Service</h4>
                <ul className="widget-list">
                  <li>
                    <Link to={PATHS.PAYMENT_METHOD}>Payment Methods</Link>
                  </li>
                  <li>
                    <Link to={PATHS.RETURN}>Returns</Link>
                  </li>
                  <li>
                    <Link to={PATHS.SHIPPING}>Shipping</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRIVATE_POLICY}>Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="widget">
                <h4 className="widget-title">My Account</h4>
                <ul className="widget-list">
                  <li>
                    <Link to={PATHS.PROFILE.INDEX}>Account Details</Link>
                  </li>
                  <li>
                    <Link to={PATHS.CART}>View Cart</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PROFILE.PROFILE_WISHLIST}>My Wishlist</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PROFILE.PROFILE_ORDER}>Track My Order</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">
            Copyright © 2023{" "}
            <a href="https://cfdcircle.vn/" target="_blank">
              <strong>CFD Circle</strong>
            </a>
            . All Rights Reserved.
          </p>
          <figure className="footer-payments">
            <img
              src="/assets/images/payments.png"
              alt="Payment methods"
              width={272}
              height={20}
            />
          </figure>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
