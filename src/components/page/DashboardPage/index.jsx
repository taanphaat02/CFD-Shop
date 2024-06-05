import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../../../constants/path";

import Breadcrumb from "../../Breadcrumb";
import NavAccount from "../../NavAccount";

const DashboardPage = () => {
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>My Account</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <NavAccount />
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
