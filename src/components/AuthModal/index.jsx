import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import cn from "../../utils/cn";
import { MODAL_TYPES } from "../../constants/general";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCloseModal,
  handleShowModal,
} from "../../store/reducer/authReducer";
import Button from "../Button";

const AuthModalContainer = styled.div`
  display: ${(props) => (props.$isShow ? "block" : "none")} !important;
`;

const AuthModal = () => {
  // const { showedModal, handleShowModal, handleCloseModal } = useAuthContext();
  // const _onTabChange = (e, tab) => {
  // 	e?.stopPropagation();
  // 	e?.preventDefault();
  // 	handleShowModal?.(tab);
  // };
  const dispatch = useDispatch();
  const { showedModal } = useSelector((state) => state.auth);
  const _onTabChange = (e, tab) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal(tab));
  };

  const _onCloseModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleCloseModal());
  };

  return (
    <>
      <AuthModalContainer
        className={cn("modal", {
          "fade show": !!showedModal,
        })}
        $isShow={!!showedModal}
        // className={`modal fade ${showedModal ? "show" : ""}`}
        // style={{ display: showedModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                // data-dismiss="modal"
                // aria-label="Close"
                onClick={_onCloseModal}
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <Link
                        className={cn("nav-link", {
                          active: showedModal === MODAL_TYPES.login,
                        })}
                        to="#signin"
                        onClick={(e) => _onTabChange(e, MODAL_TYPES.login)}
                        // id="signin-tab"
                        // data-toggle="tab"
                        // role="tab"
                        // aria-controls="signin"
                        // aria-selected="true"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={cn("nav-link", {
                          active: showedModal === MODAL_TYPES.register,
                        })}
                        onClick={(e) => _onTabChange(e, MODAL_TYPES.register)}
                        to="#register"
                        // id="register-tab"
                        // data-toggle="tab"
                        // role="tab"
                        // aria-controls="register"
                        // aria-selected="false"
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    {/* .End .tab-pane */}
                    {showedModal === MODAL_TYPES.login && <LoginForm />}
                    {showedModal === MODAL_TYPES.register && <RegisterForm />}
                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
      </AuthModalContainer>
      {!!showedModal && (
        <div className="modal-backdrop fade show" onClick={_onCloseModal}></div>
      )}
    </>
  );
};

export default AuthModal;
