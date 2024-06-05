import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { handleLogout } from "../../store/reducer/authReducer";
import { PATHS } from "../../constants/path";

const NavAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _onSignOut = (e) => {
    e?.preventDefault();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
  };
  return (
    <aside className="col-md-4 col-lg-3">
      <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
        <li className="nav-item">
          <NavLink
            end
            className="nav-link"
            // id="tab-account-link"
            // data-toggle="tab"
            // href="#tab-account"
            // role="tab"
            // aria-controls="tab-account"
            // aria-selected="false"
            to={PATHS.PROFILE.INDEX}
          >
            Account Details
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            end
            className="nav-link"
            // id="tab-orders-link"
            // data-toggle="tab"
            // href="#tab-orders"
            // role="tab"
            // aria-controls="tab-orders"
            // aria-selected="false"
            to={PATHS.PROFILE.PROFILE_ORDER}
          >
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            end
            className="nav-link"
            // id="tab-address-link"
            // data-toggle="tab"
            // href="#tab-address"
            // role="tab"
            // aria-controls="tab-address"
            // aria-selected="false"
            to={PATHS.PROFILE.PROFILE_ADDRESS}
          >
            Adresses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            end
            className="nav-link"
            // id="tab-wishlist-link"
            // data-toggle="tab"
            // href="#tab-wishlist"
            // role="tab"
            // aria-controls="tab-wishlist"
            // aria-selected="false"
            to={PATHS.PROFILE.PROFILE_WISHLIST}
          >
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            end
            className="nav-link"
            to={PATHS.PROFILE.PROFILE_CHANGEPASS}
          >
            Change Password
          </NavLink>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            onClick={_onSignOut}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default NavAccount;
