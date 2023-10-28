import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Admin_login_function } from "../../api/api";
import Loader from "../comman/loader";
const Login = () => {
  const navigate = useNavigate();
  const [emailerror, setemailerror] = useState(false);
  const [emailVal, setemailVal] = useState("");
  const [passval, setpassval] = useState("");
  const [loadidng, setLoading] = useState(false);
  // onchange for email input field
  const onEmailChange = (e) => {
    setemailVal(e.target.value);
    setemailerror(false);
  };

  //onchange for password input field
  const onPasswordChange = (e) => {
    setpassval(e.target.value);
    setemailerror(false);
  };

  // funtion for  login button submitted------
  async function sign_up_btn(event) {
    event.preventDefault();
    setLoading(true);
    let result = await Admin_login_function(emailVal, passval);
    const { resCode } = result;
    setLoading(false);

    if (resCode === "103") {
      setemailerror("email not found");
    } else if (resCode === "102") {
      setemailerror("passsword not matched");
    } else if (resCode === "104") {
      setemailerror("please fill Credentials");
    } else if (resCode === "101") {
      const { SuperAdmin_token, SuperAdmin_Details } = result;

      localStorage.setItem("admin_id", SuperAdmin_Details[0].id);

      localStorage.setItem("admin_name", SuperAdmin_Details[0].name);
      localStorage.setItem("admin_email", SuperAdmin_Details[0].email);
      localStorage.setItem("admin_token", SuperAdmin_token);

      navigate("/home");
    }
  }
  return (
    <>
      {loadidng === true ? <Loader /> : null}
      <div className="login-page">
        <div className="login-box">
          <div className="logo">
            <Link to="">
              <b>DMS</b>
            </Link>
            <small>Document Management System</small>
            <small>Login for Super Admin</small>
          </div>
          <div className="card">
            <div className="body">
              <form id="sign_in" onSubmit={sign_up_btn}>
                <div className="msg">Sign in to start your session</div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">person</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="email"
                      onChange={(e) => {
                        onEmailChange(e);
                      }}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">lock</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => onPasswordChange(e)}
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-8 p-t-5 text-danger">
                    {emailerror === "email not found"
                      ? "Email not found"
                      : emailerror === "passsword not matched"
                      ? "Password not matched"
                      : emailerror === "please fill Credentials"
                      ? "please fill Credentials"
                      : null}
                  </div>
                  <div className="col-xs-4">
                    <button
                      className="btn btn-block bg-pink waves-effect"
                      type="submit"
                    >
                      SIGN IN
                    </button>
                  </div>
                </div>
                <div className="row m-t-15 m-b--20">
                  <div className="col-xs-6 align-right">
                    <Link to="/forgetepassword">Forgot Password?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <!-- Jquery Core Js --> */}
        <script src="../../plugins/jquery/jquery.min.js"></script>

        {/* <!-- Bootstrap Core Js --> */}
        <script src="../../plugins/bootstrap/js/bootstrap.js"></script>

        {/* <!-- Waves Effect Plugin Js --> */}
        <script src="../../plugins/node-waves/waves.js"></script>

        {/* <!-- Validation Plugin Js --> */}
        <script src="../../plugins/jquery-validation/jquery.validate.js"></script>

        {/* <!-- Custom Js --> */}
        <script src="../../js/admin.js"></script>
        <script src="../../js/pages/examples/sign-in.js"></script>
      </div>
    </>
  );
};

export default Login;
