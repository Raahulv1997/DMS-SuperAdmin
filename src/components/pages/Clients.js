import React, { useEffect, useRef, useState } from "react";
import useValidation from "../comman/useValidation";
import folderImge from "../comman/images/folder1.jpg";
import {
  AddClientByadmin,
  deleteClientfunction,
  getAllClientswithFilter,
  getClientByID,
  UpdateClient,
} from "../../api/api";
import Header from "../comman/Header";

import Swal from "sweetalert2";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../comman/loader";
import ReactPaginate from "react-paginate";
// const ref = useRef();

const Clients = () => {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();

  const [AdminId, setAdminID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [modelshow, setModelshow] = useState(false);
  const [loadidng, setLoading] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clienttype, setClientType] = useState("");
  const [modelView, setModelView] = useState(false);

  const [apicall, setapicall] = useState(false);
  const ref = useRef();

  // for target model className------

  // model input field input field intialstate---------
  const initialFormState = {
    admin_id: AdminId,
    type: "",
    name: "",
    email: "",
    phone_no: "",
    address: "",
    company_name: "",
    company_address: "",
  };

  const [showCompany, setShowCompany] = useState(false);

  const [getClientsData, setGetClientsData] = useState([]);

  const [emailError, setEmailError] = useState(false);
  const id = searchparams.get("admin_id");
  useEffect(() => {
    if (
      searchparams.get("admin_id") === null ||
      searchparams.get("admin_id") === "" ||
      searchparams.get("admin_id") === undefined
    ) {
      setAdminID("");
    } else {
      setAdminID(searchparams.get("admin_id"));
    }

    if (searchparams.get("loading") === "false") {
      setLoading(true);
    }
  }, [id, AdminId]);

  // validation fuction come from use validation custom hook
  const validators = {
    type: [
      (value) =>
        value === null || value === ""
          ? "Type is  required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    name: [
      (value) =>
        value === null || value === ""
          ? "Name is required"
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
    address: [
      (value) =>
        value === null || value === "" ? "Address is required" : null,
    ],

    // company_name: [
    //   (value) =>
    //     value === null || value === ""
    //       ? "Company Name is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : null,
    // ],
    // company_address: [
    //   (value) =>
    //     value === null || value === ""
    //       ? "Company Address is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : null,
    // ],
  };

  // useValidation custom validation
  const {
    state,
    setState,
    onInputChange,
    errors,
    setErrors,
    validate,
  } = useValidation(initialFormState, validators);

  //useEffect use for model client type show company and individual
  useEffect(() => {
    if (state.type === "individual") {
      setShowCompany(true);
    } else {
      setShowCompany(false);
    }
  }, [state.type]);

  // function add client when submit button click
  const onClientAdd = async (e) => {
    setSubmitLoader(true);
    e.preventDefault();
    if (validate()) {
      const response = await toast.promise(AddClientByadmin(state), {
        pending: "Add clinet is processing",
        // success: "Upload compelete👌",
      });

      if (response.message === "already added by this admin") {
        setEmailError(true);
      }

      if (response.message === "Client added successfully") {
        toast.success("Client added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        getClients();
        setSubmitLoader(false);
        setState(state);
        setapicall(true);
        setModelView(false);
      }
    }
    setSubmitLoader(false);
    setapicall(false);
  };

  // function update client when Update  button click
  const onClientUpdate = async (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmitLoader(true);

      const response = await toast.promise(UpdateClient(state), {
        pending: "Update clinet is processing",
        // success: "Upload compelete👌",
      });

      if (response.message === "updated Client successfully") {
        toast.success("Updated Client successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        getClients();
        setapicall(true);
        setModelView(false);
        setSubmitLoader(false);
        setState(state);
      }
    }
    setSubmitLoader(false);
    setapicall(false);
  };

  // useEffcet use for get client  api fucntion call
  useEffect(() => {
    getClients();
  }, [AdminId, apicall, clientName, clienttype, currentPage]);

  // funtion for get list of client
  const getClients = async () => {
    const response = await getAllClientswithFilter(
      id,
      clientName,
      clienttype,
      currentPage
    );

    setGetClientsData(response.data);
    setPageCount(response.totalPages);
    setapicall(false);
    setLoading(false);
  };

  const clientNameOnChange = (e) => {
    setClientName(e.target.value);
    setapicall(true);
  };

  const clienttypeOnChange = (e) => {
    setClientType(e.target.value);
    setapicall(true);
  };

  // funtion for update model open and get data from api based on client id
  const onUpdateModelClick = async (id) => {
    setModelView(true);
    setModelshow(true);
    const response = await getClientByID(id);

    setState(response[0]);
  };

  // funtion for close model and reset input feild
  const onCloseModel = () => {
    setModelView(false);
    setState(initialFormState);
    setErrors({});
    setEmailError(false);
  };

  // funtion for open  model and reset input feild
  const onModelOpen = async () => {
    setModelView(true);
    setModelshow(false);
    setState(initialFormState);
    setEmailError(false);
  };

  // function for clicking client and send id and name on gallary
  const onClientClick = (id, name, token) => {
    localStorage.setItem("client_name", name);

    navigate(
      `/gallary?client_id=${id}&&loading=${loadidng}&&client_token=${token}`
    );
  };

  // funtion for open delete sweet alert
  const onDeleteModelClick = (name, id) => {
    Swal.fire({
      title: "Warning",
      text: `You want to delete ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSubmitLoader(true);
        const response = await deleteClientfunction(id);
        if (response.message === "delete clients successfully") {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setapicall(true);
          setSubmitLoader(false);
        }
      }
    });
    setSubmitLoader(false);
    setapicall(false);
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <>
      <div className="theme-red ">
        <Header />
        {/* <Loader /> */}
        {loadidng ? <Loader /> : null}
        {submitLoader ? <Loader /> : null}
        {/* <SideBar /> */}
        <section className="content">
          <div className="container-fluid">
            <div className="block-header">
              <h2>Clients Details</h2>
              <div className=" text-right">
                <button
                  className="btn btn-success"
                  // data-toggle="modal"
                  // data-target="#exampleModal"
                  onClick={() => onModelOpen()}
                >
                  ADD CLIENTS
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
                              name="name"
                              className="form-control"
                              onChange={(e) => clientNameOnChange(e)}
                              placeholder="Search Client Name"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-sm-3"
                        style={{ marginBottom: "16px" }}
                      >
                        <select
                          className="form-control "
                          value={clienttype}
                          name="type"
                          onChange={(e) => clienttypeOnChange(e)}
                        >
                          <option value={""} className="text-center">
                            -- Please select client type --
                          </option>
                          <option value="individual">Individual</option>
                          <option value="company">Company</option>
                          <option value="">all</option>
                        </select>
                      </div>
                    </div>

                    <div className="row clearfix">
                      {getClientsData.length === 0 ? (
                        <h1 className="text-center">No record Found</h1>
                      ) : (
                        getClientsData.map((item) => {
                          return (
                            <React.Fragment key={item.id}>
                              <div className="col-sm-3 col-md-2">
                                <div className="card deshbord_user_card ">
                                  <div className="header">
                                    {item.type === "individual" ? (
                                      <span className="badge btn btn-success type_icon">
                                        <i className="material-icons">person</i>
                                      </span>
                                    ) : item.type === "company" ? (
                                      <span className="badge btn btn-danger type_icon">
                                        <i className="material-icons">
                                          account_balance
                                        </i>
                                      </span>
                                    ) : null}

                                    <img
                                      src={folderImge}
                                      alt={folderImge}
                                      height="100px"
                                      onClick={() =>
                                        onClientClick(
                                          item.id,
                                          item.name,

                                          item.client_token
                                        )
                                      }
                                      style={{ cursor: "pointer" }}
                                    />
                                    <h2>{item.name}</h2>
                                    <div className="body">
                                      Phone:- {item.phone_no}
                                    </div>
                                    <div className="profile_edit_delete">
                                      <i
                                        className="material-icons text-primary"
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })
                      )}
                    </div>
                    {getClientsData.length === 0 ? null : (
                      <div className=" footer_pagination text-center">
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
      <div
        className={modelView === true ? "show_modal" : ""}
        style={modelView === true ? { opacity: "1" } : { opacity: "0" }}
      >
        <div className="back_drop"></div>
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
                  {modelshow === true ? "Update Client" : " Add Client"}
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
                            onClientUpdate(e);
                          }
                        : (e) => {
                            onClientAdd(e);
                          }
                    }
                  >
                    <div className="row clearfix">
                      <div className="modal_label col-md-2 form-control-label">
                        <label htmlFor="password_2">Type</label>{" "}
                        <small className="text-danger">*</small>
                      </div>
                      <div className="modal_input col-md-10 ">
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              className="form-control "
                              value={state.type}
                              name="type"
                              onChange={onInputChange}
                            >
                              <option value="">-- Please select type --</option>
                              <option value="individual">Individual</option>
                              <option value="company">Company</option>
                            </select>
                          </div>
                        </div>
                        {errors.type
                          ? (errors.type || []).map((error, i) => {
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
                        <label htmlFor="name">Name</label>
                        <small className="text-danger">*</small>
                      </div>
                      <div className="modal_input col-md-10">
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              maxLength={30}
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
                            <small className="text-danger error_massage">
                              Client already registerd by this admin
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="row clearfix">
                      <div className="modal_label col-md-2 form-control-label">
                        <label htmlFor="name">PhoneNo.</label>
                        <small className="text-danger">*</small>
                      </div>
                      <div className="modal_input col-md-10 ">
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="number"
                              id="phone_no"
                              name="phone_no"
                              maxLength={10}
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
                        <label htmlFor="name">Address </label>{" "}
                        <small className="text-danger">*</small>
                      </div>
                      <div className="modal_input col-md-10 ">
                        <div className="form-group">
                          <div className="form-line">
                            <textarea
                              rows="4"
                              className="form-control no-resize"
                              placeholder="Please type what you want..."
                              name="address"
                              value={state.address}
                              onChange={onInputChange}
                            ></textarea>
                          </div>
                          {errors.address
                            ? (errors.address || []).map((error, i) => {
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

                    {showCompany === false ? (
                      <div>
                        <div className="row clearfix">
                          <div className="modal_label col-md-2 form-control-label">
                            <label htmlFor="name">Company Name. </label>
                          </div>
                          <div className="modal_input col-md-10 ">
                            <div className="form-group">
                              <div className="form-line">
                                <input
                                  type="text"
                                  id="company_name"
                                  maxLength={30}
                                  name="company_name"
                                  value={state.company_name}
                                  onChange={onInputChange}
                                  className="form-control"
                                  placeholder="Enter your company name"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row clearfix">
                          <div className="modal_label col-md-2 form-control-label">
                            <label htmlFor="name">Company Address </label>
                          </div>
                          <div className="modal_input col-md-10 ">
                            <div className="form-group">
                              <div className="form-line">
                                <textarea
                                  rows="4"
                                  className="form-control no-resize"
                                  placeholder="Please type what you want..."
                                  name="company_address"
                                  value={state.company_address}
                                  onChange={onInputChange}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="row clearfix">
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          // data-dismiss="modal"
                          // id="closeButton1"
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

export default Clients;
