// import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
const BlankPage = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/");
  // }, []);

  return (
    <>
      <div className="four-zero-four">
        <div className="four-zero-four-container">
          <div className="error-code">404</div>
          <div className="error-message">This page doesn't exist</div>
          <div className="button-place">
            <Link to="/" className="btn btn-default btn-lg waves-effect">
              GO TO LOGIN
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlankPage;
