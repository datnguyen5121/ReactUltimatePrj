import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import Language from "../Header/Language";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const handleLogin = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }
    setIsLoading(true);
    //submit apis
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const handleNavigateRegister = () => {
    navigate("/register");
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleKeyDown = (event) => {
    console.log("event key: ", event.key === "Enter");
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Dont have an account yet ?</span>
        <button onClick={() => handleNavigateRegister()}>Sign up</button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">Dat Nguyen</div>
      <div className="welcome col-4 mx-auto">Hello, who's this ?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group password-container">
          <label>Password</label>
          <input
            type={showPassword ? "password" : "text"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
          />
          <div className="eye-toggle" onClick={() => handleShowPassword()}>
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}{" "}
          </div>
        </div>
        <span className="forgot-password">Forgot password ?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()} disabled={isLoading}>
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
            <span>Login to Dat Nguyen</span>
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            &#60; Go to HomePage
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
