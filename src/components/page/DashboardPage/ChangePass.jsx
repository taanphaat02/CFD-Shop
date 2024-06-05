import React, { useRef } from "react";
import { Input } from "../../Input";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { authService } from "../../../services/authService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { MESSAGE, REGEX } from "../../../constants/validate";

const ChangePass = () => {
  const { profile } = useSelector((state) => state.auth);
  const newPassword = useRef({});
  const password = useRef({});
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  newPassword.current = watch("newPassword", "");
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    if (!profile?.phone) {
      message.info("Please fill full your information before change password");
      navigate(PATHS.PROFILE.INDEX);
      return;
    }
    try {
      const res = await authService.updateProfile({ ...profile, ...data });
      if (res.status == 200) {
        message.success("Update Password successfully");
        setTimeout(() => {
          navigate(PATHS.PROFILE.INDEX);
        }, 500);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong at change password";
      // message.error(errorMessage);

      if (errorMessage.includes("password sai")) {
        message.error("Current passwords do not match!");
      } else {
        message.error(errorMessage);
      }
    }
  };

  return (
    <div className="tab-pane fade show active">
      <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          label="Current password (leave blank to leave unchanged)"
          defaultValue={null}
          {...register("password", {
            required: "Please enter your old password",
          })}
          error={errors?.password?.message || ""}
        />

        <Input
          type="password"
          label="New password (leave blank to leave unchanged)"
          defaultValue={null}
          {...register("newPassword", {
            required: "Please enter your new password",
            pattern: {
              value: REGEX.password6char,
              message: MESSAGE.pass6char,
            },
            validate: (value) =>
              value !== password.current ||
              "New password must be different from current password",
          })}
          error={errors?.newPassword?.message || ""}
        />

        <Input
          type="password"
          label="Confirm new password"
          defaultValue={null}
          {...register("cpassword", {
            required: "Please enter your confirm new password",
            pattern: {
              value: REGEX.password6char,
              message: MESSAGE.pass6char,
            },
            validate: (value) =>
              value === newPassword.current ||
              "New password and confirm password do not match",
          })}
          error={errors?.cpassword?.message || ""}
        />
        <button className="btn btn-outline-primary-2">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ChangePass;
