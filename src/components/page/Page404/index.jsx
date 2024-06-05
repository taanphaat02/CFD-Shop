import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";

const Page404 = () => {
  return (
    <main className="main">
      <div
        className="error-content text-center"
        style={{
          backgroundImage: "url(assets/images/backgrounds/error-bg.jpg)",
        }}
      >
        <div className="container">
          <h1 className="error-title">Error 404</h1>
          <p>We are sorry, the page you've requested is not available.</p>
          <Link
            to={PATHS.HOME}
            className="btn btn-outline-primary-2 btn-minwidth-lg"
          >
            <span>BACK TO HOMEPAGE</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page404;
