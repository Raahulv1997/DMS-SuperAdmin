import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordFunction } from "../../api/api";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const [emailToken, setEmailToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [PasswordError, setPasswordError] = useState(false);
  const [getLinkLoader, setGetLinkLoader] = useState(false);
  useEffect(() => {
    if (
      searchparams.get("token") === null ||
      searchparams.get("token") === "" ||
      searchparams.get("token") === undefined
    ) {
      setEmailToken("");
    } else {
      setEmailToken(searchparams.get("token"));
    }
  }, [emailToken]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (password === "") {
      setPasswordError("password is black");
    } else if (confirmpassword === "") {
      setPasswordError("confirmpassword is black");
    } else if (password !== confirmpassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setGetLinkLoader(true);
      const response = await ResetPasswordFunction(password, emailToken);
      setGetLinkLoader(false);
      if (response.message === "updated password successfully") {
        Swal.fire({
          title: "Success",
          text: "password changed successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function() {
          navigate("/");
        });
      }
    }

    // Submit the form
    // Your logic for form submission goes here
  };

  return (
    <>
      <div className="fp-page">
        <div className="fp-box">
          <div className="logo">
            <Link to="">
              <b>DMS</b>
            </Link>
            <small>Document Management System</small>
          </div>
          <div className="card">
            <div className="body">
              <form id="forgot_password" onSubmit={handleSubmit}>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">lock</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="password"
                      className="form-control"
                      minLength={"4"}
                      maxLength={"20"}
                      name="password"
                      placeholder="New password"
                      onChange={handlePasswordChange}
                      autoFocus
                    />
                  </div>
                  {PasswordError === "password is black" ? (
                    <small className="text-danger">
                      Password is required!!!
                    </small>
                  ) : null}
                </div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">lock</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="password"
                      className="form-control"
                      name="Confirm new password"
                      minLength={"4"}
                      maxLength={"20"}
                      placeholder="Confirm new password"
                      onChange={handleConfirmPasswordChange}
                      autoFocus
                    />
                  </div>
                  {PasswordError === "confirmpassword is black" ? (
                    <small className="text-danger">
                      Confirm Password is required!!!
                    </small>
                  ) : null}
                  {PasswordError === "Passwords do not match" ? (
                    <small className="text-danger">
                      Passwords do not match!!!!
                    </small>
                  ) : null}
                </div>
                <button
                  className="btn btn-block btn-lg bg-pink waves-effect"
                  type="submit"
                >
                  {" "}
                  <div
                    className={
                      getLinkLoader === true
                        ? "get_link_spinner loader_btn"
                        : "loader_btn"
                    }
                  >
                    <div class="preloader pl-size-xs">
                      <div class="spinner-layer pl-red-grey">
                        <div class="circle-clipper left">
                          <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                          <div class="circle"></div>
                        </div>
                      </div>
                    </div>

                    <span className="get_link_btn">RESET MY PASSWORD</span>
                  </div>
                </button>

                <div class="row m-t-20 m-b--5 align-center">
                  <Link to="/">Sign In!</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
