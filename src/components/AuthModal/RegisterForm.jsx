import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import useDebounce from "../../hook/useDebounce";
import ComponentLoading from "../ComponentLoading";
import { MESSAGE, REGEX } from "../../constants/validate";
import { Input } from "../Input";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../store/reducer/authReducer";
import { message } from "antd";

const RegisterForm = () => {
  // const { handleRegister } = useAuthContext();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data && !loading.register) {
      try {
        const { name, email, password } = data;
        const payload = {
          firstName: name || "",
          lastName: "",
          email,
          password,
        };
        // console.log("payload", payload);
        dispatch(handleRegister(payload));
      } catch (error) {
        console.log("error submit RegisterForm", error);
      }
    }
  };

  const renderLoading = useDebounce(loading.register, 300);

  return (
    <div
      className="tab-pane fade show active"
      // id="register"
      // role="tabpanel"
      // aria-labelledby="register-tab"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        {renderLoading && <ComponentLoading />}
        <Input
          label="Your email address"
          required
          {...register("email", {
            required: MESSAGE.required,
            pattern: {
              value: REGEX.email,
              message: MESSAGE.email,
            },
          })}
          error={errors?.email?.message}
        />

        <Input
          label="Password"
          type="password"
          required
          {...register("password", {
            required: MESSAGE.required,
            pattern: {
              value: REGEX.password6char,
              message: MESSAGE.pass6char,
            },
          })}
          error={errors?.password?.message}
        />

        <div className="form-footer">
          <Button type="submit" variant="outline">
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </Button>

          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="register-policy"
              {...register("isAgree", {
                required: "Please agree with our policy",
              })}
            />
            <label className="custom-control-label" htmlFor="register-policy">
              I agree to the{" "}
              <Link to={PATHS.PRIVATE_POLICY}>privacy policy</Link> *
            </label>
          </div>
          {errors?.isAgree?.message && (
            <p className="form-error">{errors.isAgree.message}</p>
          )}
          {/* End .custom-checkbox */}
        </div>
        {/* End .form-footer */}
      </form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a
              href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&hl=vi&ifkv=AaSxoQyfKROfV3LyYVLXEM_zuApxz1ZdGJBI-a4elVMoKcHSPj7xMgCwzIcsvQd4tL6fA8sHeKl7UQ&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1258648156%3A1716791854441652&ddm=0"
              className="btn btn-login btn-g"
            >
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a
              href="https://m.facebook.com/login/"
              className="btn btn-login btn-f"
            >
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
          {/* End .col-6 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .form-choice */}
    </div>
  );
};

export default RegisterForm;
