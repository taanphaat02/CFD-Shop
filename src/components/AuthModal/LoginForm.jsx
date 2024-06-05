import ComponentLoading from "../ComponentLoading";
import { MESSAGE, REGEX } from "../../constants/validate";
import { Input } from "../Input";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES } from "../../constants/general";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { useForm } from "react-hook-form";
import useDebounce from "../../hook/useDebounce";
import { handleLogin } from "../../store/reducer/authReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  // const { handleLogin, handleCloseModal } = useAuthContext();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    if (data && !loading.login) {
      // setLoading(true);
      // handleLogin?.(data, () => {
      // 	setTimeout(() => {
      // 		setLoading(false);
      // 	}, 300);
      // });
      try {
        const res = await dispatch(handleLogin(data)).unwrap();

        // console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const renderLoading = useDebounce(loading.login, 300);

  return (
    <div
      className="tab-pane fade show active"
      // id="signin"
      // role="tabpanel"
      // aria-labelledby="signin-tab"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        {renderLoading && <ComponentLoading />}

        {/* Input Email */}
        <Input
          label="Username or email address"
          required
          {...register("email", {
            required: MESSAGE.required,
            pattern: {
              value: REGEX.email,
              message: MESSAGE.email,
            },
          })}
          error={errors?.email?.message || ""}
        />

        {/* Input password */}
        <Input
          label="Password"
          required
          type="password"
          {...register("password", {
            required: MESSAGE.required,
          })}
          error={errors?.password?.message || ""}
        />

        <div className="form-footer">
          <Button type="submit" variant="outline">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="signin-remember"
            />
            <label className="custom-control-label" htmlFor="signin-remember">
              Remember Me
            </label>
          </div>
          {/* End .custom-checkbox */}
          <a href="#" className="forgot-link">
            Forgot Your Password?
          </a>
        </div>
        {/* End .form-footer */}
      </form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&hl=vi&ifkv=AaSxoQyfKROfV3LyYVLXEM_zuApxz1ZdGJBI-a4elVMoKcHSPj7xMgCwzIcsvQd4tL6fA8sHeKl7UQ&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1258648156%3A1716791854441652&ddm=0" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a href="https://m.facebook.com/login/" className="btn btn-login btn-f">
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

export default LoginForm;
