import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Language from "../Header/Language";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const postRegister = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    //submit apis
    let data = await handleRegister(email, password, username);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const handleNavigateLogin = () => {
    navigate("/login");
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="register-container">
      <div className="header">
        <span>You have account ?</span>
        <button onClick={() => handleNavigateLogin()}>Sign in</button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">Dat Nguyen</div>
      <div className="welcome col-4 mx-auto">One Acount, Free Feature</div>
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
        <div className="form-group">
          <label>Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group password-container">
          <label>Password</label>
          <input
            type={showPassword ? "password" : "text"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="eye-toggle" onClick={() => handleShowPassword()}>
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}{" "}
          </div>
        </div>
        <span className="forgot-password">Forgot password ?</span>
        <div>
          <button className="btn-submit" onClick={() => postRegister()}>
            Register to Dat Nguyen
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
export default Register;
