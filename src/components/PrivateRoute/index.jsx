import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import tokenMethod from "../../utils/token";
import { handleShowModal } from "../../store/reducer/authReducer";
import { MODAL_TYPES } from "../../constants/general";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const dispatch = useDispatch();
  if (!!!tokenMethod.get()) {
    dispatch(handleShowModal(MODAL_TYPES.login));
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
