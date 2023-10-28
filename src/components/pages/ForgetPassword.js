import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ForgetPasswordFunction } from "../../api/api";
import useValidation from "../comman/useValidation";

const ForgetPassword = () => {
  const [getLinkLoader, setGetLinkLoader] = useState(false);
  const initialFormState = {
    email: "",
  };
  const validators = {
    email: [
      (value) =>
        value === null || value === ""
          ? "Email address is required"
          : !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email address"
          : null,
    ],
  };

  //useVAlidation custom validation--- import
  const {
    state,

    onInputChange,
    errors,
    setErrors,
    validate,
  } = useValidation(initialFormState, validators);

  const onForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setGetLinkLoader(true);
      const response = await ForgetPasswordFunction(state.email);
      if (response.message === "email send successfully") {
        setErrors("email send successfully");
        setGetLinkLoader(false);
      }
    }
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
              <form
                id="forgot_password"
                onSubmit={(e) => onForgetPasswordSubmit(e)}
              >
                <div className="msg">
                  Enter your email address that you used to register. We'll send
                  you an email with your username and a link to reset your
                  password.
                </div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">email</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      maxLength={30}
                      value={state.email}
                      onChange={onInputChange}
                      // required
                    />
                  </div>
                  {errors.email
                    ? (errors.email || []).map((error, i) => {
                        return (
                          <small className="text-danger" key={i}>
                            {error}
                          </small>
                        );
                      })
                    : null}
                  {errors === "email send successfully" ? (
                    <small className="text-danger">
                      Reset Link send your email
                    </small>
                  ) : null}
                </div>

                <button
                  className="btn btn-block btn-lg bg-pink waves-effect"
                  type="submit"
                >
                  <div
                    className={
                      getLinkLoader === true
                        ? "get_link_spinner loader_btn"
                        : "loader_btn"
                    }
                  >
                    <div className="preloader pl-size-xs">
                      <div className="spinner-layer pl-red-grey">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>

                    <span className="get_link_btn">GET link</span>
                  </div>
                </button>

                <div className="row m-t-20 m-b--5 align-center">
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

export default ForgetPassword;
