import React, { useEffect, useRef, useState } from "react";
import useValidation from "../comman/useValidation";
import userlogo from "../comman/images/userLogo.jpg";
import {
  AddUsers,
  deleteUserfunction,
  getAllAdminwithFilter,
  getUserByID,
  UpdateAdmin,
} from "../../api/api";
import Header from "../comman/Header";
// import SideBar from "../comman/SideBar";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../comman/loader";
// const ref = useRef();
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
const AllAdmin = () => {
  const navigate = useNavigate();

  const [Modelclassvalue, setModelclassvalue] = useState("");
  const [apicall, setapicall] = useState(false);
  const [modelView, setModelView] = useState(false);
  const ref = useRef();

  // useEffect for target model classname
  useEffect(() => {
    setModelclassvalue(ref.current.className);
  }, [Modelclassvalue]);

  //intial state for add employeee
  const initialFormState = {
    admin_id: "0",
    type: "admin",
    name: "",
    phone_no: "",
    is_active: "",
    email: "",
    password: "",
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loadidng, setLoading] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [employeeName, setemployeeName] = useState("");
  const [modelshow, setModelshow] = useState(false);
  const [getUsersData, setGetUsersData] = useState([]);

  const [emailError, setEmailError] = useState(false);

  // funtion for validation employee input field
  const validators = {
    // type: [
    //   (value) =>
    //     value === null || value === ""
    //       ? "Type is  required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : null,
    // ],
    name: [
      (value) =>
        value === null || value === ""
          ? "Name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    phone_no: [
      (value) =>
        value === null || value === ""
          ? "Phone number is required"
          : // : /^(\+\d{1,3}[- ]?)?\d{10}$/g.test(value)
          // ? "Invalid Mobile number "
          value.length > 10 || value.length < 10
          ? "Contect number should be 10 digit"
          : null,
    ],
    is_active: [
      (value) =>
        value === null || value === ""
          ? "Status is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    email: [
      (value) =>
        value === null || value === ""
          ? "Email address is required"
          : !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email address"
          : null,
    ],

    password: [
      (value) =>
        value === null || value === ""
          ? "Password is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
  };

  // import useValidation function validation----
  const {
    state,
    setState,
    onInputChange,
    errors,
    setErrors,
    validate,
  } = useValidation(initialFormState, validators);

  // funtion for add employee submit button-----
  const onUserAdd = async (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitLoader(true);

      const response = await toast.promise(AddUsers(state), {
        pending: "Add Employee is processing",
        // success: "Upload compelete👌",
      });

      setSubmitLoader(false);
      if (
        response.response ===
        "email already exist, check your mail or try after sometime"
      ) {
        setEmailError(true);
      }
      if (response.message === "user added successfully") {
        toast.success("Admin  added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        getAdmin();
        setModelView(false);

        setState(initialFormState);
        setapicall(true);
      }
      setapicall(false);
      // setState(initialFormState);
    }
  };

  // funtion for update employee
  const onUserUpdate = async (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitLoader(true);

      const response = await toast.promise(UpdateAdmin(state), {
        pending: "Update Employee is processing",
        // success: "Update Emplyoee compelete👌",
      });

      setSubmitLoader(false);
      if (response.message === "updated user successfully") {
        toast.success("Admin update successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        getAdmin();
        setModelView(false);

        setState(initialFormState);
        setapicall(true);
      }
      setapicall(false);
      // setState(initialFormState);
    }
  };

  // useEffect for get All employee
  useEffect(() => {
    getAdmin();
  }, [apicall, employeeName, currentPage]);

  // funtion for get list of Employee
  const getAdmin = async () => {
    const response = await getAllAdminwithFilter(employeeName, currentPage);

    setGetUsersData(response.data);
    setPageCount(response.totalPages);
    setLoading(false);
    setapicall(false);
  };

  const employeeNameOnChange = (e) => {
    setemployeeName(e.target.value);
    setapicall(true);
  };

  // funtion for close model and reset input feild and error massage hide
  const onCloseModel = () => {
    setModelView(false);
    setState(initialFormState);
    setEmailError(false);
    setErrors({});
  };

  // funtion for open model
  const onModelOpen = async () => {
    setModelView(true);
    setModelshow(false);

    setState(state);
  };

  // function for update empolyee model and get detail based on employee id
  const onUpdateModelClick = async (id) => {
    setModelView(true);
    setModelshow(true);
    const response = await getUserByID(id);
    setState(response[0]);
  };

  // funtion for open delete sweet alert
  const onDeleteModelClick = (name, id) => {
    Swal.fire({
      title: "Warning",
      text: `You want to delete ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUserfunction(id);
        if (response.message === "delete user successfully") {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setapicall(true);
        }
      }
    });
    setapicall(false);
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const onAdminClick = (id) => {
    navigate(`/employee?admin_id=${id}&&loading=${loadidng}`);
  };

  const onClientClick = (id) => {
    navigate(`/clients?admin_id=${id}&&loading=${loadidng}`);
  };

  return (
    <>
      <div className="theme-red ">
        <Header />
        {/* <SideBar /> */}
        {loadidng ? <Loader /> : null}
        {submitLoader ? <Loader /> : null}
        <section className="content">
          <div className="container-fluid">
            <div className="block-header">
              <h2>Admin Details</h2>
              <div className=" text-right">
                <button
                  className="btn btn-success"
                  // data-toggle="modal"
                  // data-target="#exampleModal"
                  onClick={() => onModelOpen()}
                >
                  ADD ADMIN
                </button>
              </div>
            </div>

            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="card">
                  <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-3">
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Search by Admin Name"
                              onChange={(e) => employeeNameOnChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      {getUsersData.length === 0 ? (
                        <h1 className="text-center">No record Found</h1>
                      ) : (
                        getUsersData.map((item) => {
                          return (
                            <React.Fragment key={item.id}>
                              <div className="col-sm-2">
                                <div className="card deshbord_user_card">
                                  <div className="header">
                                    <img
                                      src={userlogo}
                                      alt={userlogo}
                                      height="100px"
                                    />
                                    <h2>{item.name}</h2>
                                    <div className="body profile_email">
                                      <i className="material-icons">email</i>
                                      <span>{item.email}</span>
                                    </div>
                                  </div>
                                  <div className="profile_edit_delete">
                                    <i
                                      className="material-icons text-danger"
                                      // data-toggle="modal"
                                      // data-target="#exampleModal"
                                      onClick={() =>
                                        onUpdateModelClick(item.id)
                                      }
                                    >
                                      edit
                                    </i>
                                    <i
                                      className="material-icons text-danger"
                                      onClick={() =>
                                        onDeleteModelClick(item.name, item.id)
                                      }
                                    >
                                      delete
                                    </i>
                                    <i
                                      className="material-icons text-danger"
                                      onClick={() => onAdminClick(item.id)}
                                    >
                                      account_circle
                                    </i>

                                    <i
                                      className="material-icons text-danger"
                                      onClick={() => onClientClick(item.id)}
                                    >
                                      folder
                                    </i>
                                  </div>

                                  {/* <div className=" text-center">
                                  <button
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => onUpdateModelClick(item.id)}
                                  >
                                    UPDATE
                                  </button>
                                </div> */}
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })
                      )}
                    </div>
                    {getUsersData.length === 0 ? null : (
                      <div className="footer_pagination text-center">
                        <ReactPaginate
                          breakLabel="..."
                          pageCount={pageCount}
                          pageRangeDisplayed={3}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={modelView === true ? "show_modal" : "gourav"}>
        <div className="back_drop" onClick={() => onCloseModel()}></div>
        <div
          ref={ref}
          // className={
          //   Modelclassvalue === "modal fade"
          //     ? "modal fade"
          //     : modelClass === true
          //     ? "modal fade"
          //     : "modal fade in"
          // }
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          // aria-labelledby="exampleModalLabel"
          // aria-hidden="true"
          className={"modal"}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {modelshow === true ? "Update Admin" : " Add Admin"}
                </h5>
                <button
                  type="button"
                  className="close"
                  // data-dismiss="modal"
                  // aria-label="Close"
                  onClick={() => onCloseModel()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="body">
                  <form
                    className="form-horizontal"
                    onSubmit={
                      modelshow === true
                        ? (e) => {
                            onUserUpdate(e);
                          }
                        : (e) => {
                            onUserAdd(e);
                          }
                    }
                  >
                    {/* <div className="row clearfix">
                    <div className="modal_label col-md-2 form-control-label">
                      <label for="password_2">Type</label>{" "}
                      <small className="text-danger">*</small>
                    </div>
                    <div className="modal_input col-md-10">
                      <select
                        className="form-control "
                        value={state.type}
                        name="type"
                        onChange={onInputChange}
                      >
                        <option value="">-- Please select type --</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                      </select>
                      {errors.type
                        ? (errors.type || []).map((error, i) => {
                            return (
                              <small className="text-danger error_massage" key={i}>
                                {error}
                              </small>
                            );
                          })
                        : null}
                    </div>
                  </div> */}
                    <div className="row clearfix">
                      <div className="modal_label col-md-2 form-control-label">
                        <label htmlFor="name">Name</label>
                        <small className="text-danger">*</small>
                      </div>
                      <div className="modal_input col-md-10">
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="name"
                              maxLength={30}
                              name="name"
                              value={state.name}
                              onChange={onInputChange}
                              className="form-control"
                              placeholder="Enter your name"
                            />
                          </div>
                          {errors.name
                            ? (errors.name || []).map((error, i) => {
                                return (
                                  <small
                                    className="text-danger error_massage"
                                    key={i}
                                  >
                                    {error}
                                  </small>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="modal_label col-md-2 form-control-label">
                        <label htmlFor="name">PhoneNo. </label>
                        <small className="text-danger">*</small>
                      </div>
                      <div className="modal_input col-md-10">
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="number"
                              id="phone_no"
                              maxLength={10}
                              name="phone_no"
                              value={state.phone_no}
                              onChange={onInputChange}
                              className="form-control"
                              placeholder="Enter your phone no"
                            />
                          </div>
                          {errors.phone_no
                            ? (errors.phone_no || []).map((error, i) => {
                                return (
                                  <small
                                    className="text-danger error_massage"
                                    key={i}
                                  >
                                    {error}
                                  </small>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="modal_label col-md-2 form-control-label">
                        <label htmlFor="password_2">Status</label>{" "}
                        <small className="text-danger">*</small>
                      </div>
                      <div className="modal_input col-md-10">
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              className="form-control "
                              value={state.is_active}
                              name="is_active"
                              onChange={onInputChange}
                            >
                              <option value="">
                                -- Please select Status --
                              </option>
                              <option value="1">Active</option>
                              <option value="0">Unactive</option>
                            </select>
                          </div>
                        </div>

                        {errors.is_active
                          ? (errors.is_active || []).map((error, i) => {
                              return (
                                <small className="text-danger" key={i}>
                                  {error}
                                </small>
                              );
                            })
                          : null}
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="modal_label col-md-2 form-control-label">
                        <label htmlFor="email">Email</label>
                        <small className="text-danger">*</small>
                      </div>
                      <div
                        className="modal_input col-md-10 
                    "
                      >
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={state.email}
                              onChange={onInputChange}
                              className="form-control"
                              placeholder="Enter your email address"
                            />
                          </div>
                          {errors.email
                            ? (errors.email || []).map((error, i) => {
                                return (
                                  <small
                                    className="text-danger error_massage"
                                    key={i}
                                  >
                                    {error}
                                  </small>
                                );
                              })
                            : null}

                          {emailError === true ? (
                            <small className="text-danger">
                              Email Already Registered Please try another email
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="row clearfix">
                      <div className="modal_label col-md-2 form-control-label">
                        <label htmlFor="email">Password</label>
                        <small className="text-danger">*</small>
                      </div>
                      <div
                        className="modal_input col-md-10 
                    "
                      >
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              minLength={4}
                              maxLength={15}
                              value={state.password}
                              onChange={onInputChange}
                              className="form-control"
                              placeholder="Enter your password"
                            />
                          </div>
                          {errors.password
                            ? (errors.password || []).map((error, i) => {
                                return (
                                  <small
                                    className="text-danger error_massage"
                                    key={i}
                                  >
                                    {error}
                                  </small>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    </div>

                    <div className="row clearfix">
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          id="closeButton1"
                          onClick={() => onCloseModel()}
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {modelshow === true ? "Update" : " Add "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AllAdmin;
