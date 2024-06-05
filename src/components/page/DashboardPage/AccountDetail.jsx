import React from "react";
import FormAccount from "./FormAccount";
import { useSelector } from "react-redux";
import useQuery from "../../../hook/useQuery";
import { authService } from "../../../services/authService";

const AccountDetail = () => {
  const { profile } = useSelector((state) => state.auth);

  if (!profile) return null;
  return profile && <FormAccount profile={profile} />;
};

export default AccountDetail;
