import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tokenMethod from "../utils/token";
import { PATHS } from "../constants/path";
import { authService } from "../services/authService";
import { message } from "antd";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState();

  const navigate = useNavigate();

  // SHOW MODAL
  const handleShowModal = (modalType) => {
    if (!!!tokenMethod.get()) {
      setShowedModal(modalType || "");
    }
  };

  // CLOSE MODAL
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };

  // LOGIN
  const handleLogin = async (loginData, callback) => {
    const payload = { ...loginData };
    try {
      const res = await authService.login(payload);
      const { token: accessToken, refreshToken } = res?.data?.data || {};

      // Lưu token
      tokenMethod.set({
        accessToken,
        refreshToken,
      });

      if (!!tokenMethod.get()) {
        // Lấy thông tin profile
        handleGetProfile();
        message.success("Đăng nhập thành công");
        handleCloseModal();
      }
    } catch (error) {
      console.log("🚀error---->", error);
      message.error("Đăng nhập thất bại");
    } finally {
      callback?.();
    }
  };

  // REGISTER
  const handleRegister = async (registerData, callback) => {
    // payload
    try {
      const { email, password } = registerData || {};
      const payload = {
        firstName: email,
        lastName: "",
        email,
        password,
      };
      const res = await authService.register(payload);
      //  check data case {""}
      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công");
        handleLogin({
          email,
          password,
        });
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }
    } finally {
      callback?.();
    }
  };

  // LOGOUT
  const handleLogout = () => {
    tokenMethod.remove();
    setProfile(undefined);
    navigate(PATHS.HOME);
  };

  const handleGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfile(profileRes.data.data);
      }
    } catch (error) {
      console.log("error AuthContext GetProfile", error);
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetProfile,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
