import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPES } from "../../constants/general";
import tokenMethod from "../../utils/token";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout, handleShowModal } from "../../store/reducer/authReducer";
import { useNavigate } from "react-router-dom";

const HeaderTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { firstName, email } = profile || {};
  const { cardInfo } = useSelector((state) => state.cart);

  const _onShowAuthModal = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    // handleShowModal?.(MODAL_TYPES.login);
    dispatch(handleShowModal(MODAL_TYPES.login));
    // dispatch(handleShowModal([]));
  };

  const _onSignOut = (e) => {
    e?.preventDefault();
    // handleLogout();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
  };

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!tokenMethod?.get() ? (
            <>
              <ul className="top-menu top-link-menu">
                <li>
                  <a
                    href="#signin-modal"
                    // data-toggle="modal"
                    className="top-menu-login"
                    onClick={_onShowAuthModal}
                  >
                    <i className="icon-user" />
                    Login | Resgister{" "}
                  </a>
                </li>
                <li></li>
              </ul>
            </>
          ) : (
            <>
              <ul className="top-menu">
                <li>
                  <Link to={PATHS.PROFILE.INDEX} className="top-link-menu">
                    <i className="icon-user" />
                    {firstName || email || "Guest"}
                  </Link>
                  <ul>
                    <li>
                      <ul>
                        <li>
                          <Link to={PATHS.PROFILE.INDEX}>Account Details</Link>
                        </li>
                        <li>
                          {" "}
                          <Link to={PATHS.PROFILE.PROFILE_ORDER}>
                            Your Orders
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link to={PATHS.PROFILE.PROFILE_WISHLIST}>
                            Wishlist <span>({profile?.whiteList?.length})</span>
                          </Link>
                        </li>
                        <li>
                          <a href="#" onClick={_onSignOut}>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
