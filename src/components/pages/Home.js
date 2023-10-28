import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetDashBoardDetails } from "../../api/api";
import Header from "../comman/Header";

import SideBar from "../comman/SideBar";

const Home = () => {
  const [getDashBoardData, setDashBoardData] = useState([]);

  useEffect(() => {
    getDashBorad_details();
  }, []);

  const getDashBorad_details = async () => {
    const response = await GetDashBoardDetails();
    // console.log("data--" + JSON.stringify(response[0]));
    setDashBoardData(response[0]);
  };

  return (
    <>
      <div className="theme-red ">
        <Header />
        <SideBar />

        <section className="content">
          <div className="container-fluid">
            <div className="block-header">
              <h2>DASHBOARD</h2>
            </div>

            {/* <!-- Widgets --> */}
            <div className="row clearfix">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="info-box bg-pink hover-expand-effect">
                  <div className="icon">
                    <i className="material-icons">folder_shared</i>
                  </div>
                  <div className="content">
                    <div className="text">CLIENTS</div>
                    <div
                      className="number count-to"
                      data-from="0"
                      data-to="125"
                      data-speed="15"
                      data-fresh-interval="20"
                    >
                      {getDashBoardData.clients}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="info-box bg-cyan hover-expand-effect">
                  <div className="icon">
                    <i className="material-icons">recent_actors</i>
                  </div>
                  <div className="content">
                    <div className="text">EMPLOYEE </div>
                    <div
                      className="number count-to"
                      data-from="0"
                      data-to="257"
                      data-speed="1000"
                      data-fresh-interval="20"
                    >
                      {getDashBoardData.employee}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="info-box bg-orange  hover-expand-effect">
                  <div className="icon">
                    <i className="material-icons">recent_actors</i>
                  </div>
                  <div className="content">
                    <div className="text">ADMIN </div>
                    <div
                      className="number count-to"
                      data-from="0"
                      data-to="257"
                      data-speed="1000"
                      data-fresh-interval="20"
                    >
                      {getDashBoardData.admin}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="info-box bg-light-green hover-expand-effect">
                  <div className="icon">
                    <i className="material-icons">folder</i>
                  </div>
                  <div className="content">
                    <div className="text">DOCUMENTS</div>
                    <div
                      className="number count-to"
                      data-from="0"
                      data-to="243"
                      data-speed="1000"
                      data-fresh-interval="20"
                    >
                      {getDashBoardData.document}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="info-box bg-orange hover-expand-effect">
                  <div className="icon">
                    <i className="material-icons">person_add</i>
                  </div>
                  <div className="content">
                    <div className="text">NEW VISITORS</div>
                    <div
                      className="number count-to"
                      data-from="0"
                      data-to="1225"
                      data-speed="1000"
                      data-fresh-interval="20"
                    ></div>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <!-- #END# Widgets --> */}
            {/* <!-- CPU Usage --> */}
            <div className="row clearfix">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="card">
                  <div className="header">
                    <div className="row clearfix">
                      <div className="col-xs-12 col-sm-6">
                        <h2>CPU USAGE (%)</h2>
                      </div>
                      <div className="col-xs-12 col-sm-6 align-right">
                        <div className="switch panel-switch-btn">
                          <span className="m-r-10 font-12">REAL TIME</span>
                          <label>
                            OFF
                            {/* <input type="checkbox" id="realtime" checked /> */}
                            <span className="lever switch-col-cyan"></span>ON
                          </label>
                        </div>
                      </div>
                    </div>
                    <ul className="header-dropdown m-r--5">
                      <li className="dropdown">
                        <Link
                          to=""
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="material-icons">more_vert</i>
                        </Link>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <Link to="">Action</Link>
                          </li>
                          <li>
                            <Link to="">Another action</Link>
                          </li>
                          <li>
                            <Link to="">Something else here</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="body">
                    <div
                      id="real_time_chart"
                      className="dashboard-flot-chart"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- #END# CPU Usage --> */}
            <div className="row clearfix">
              {/* <!-- Visitors --> */}
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div className="card">
                  <div className="body bg-pink">
                    <div
                      className="sparkline"
                      data-type="line"
                      data-spot-radius="4"
                      data-highlight-spot-color="rgb(233, 30, 99)"
                      data-highlight-line-color="#fff"
                      data-min-spot-color="rgb(255,255,255)"
                      data-max-spot-color="rgb(255,255,255)"
                      data-spot-color="rgb(255,255,255)"
                      data-offset="90"
                      data-width="100%"
                      data-height="92px"
                      data-line-width="2"
                      data-line-color="rgba(255,255,255,0.7)"
                      data-fill-color="rgba(0, 188, 212, 0)"
                    >
                      12,10,9,6,5,6,10,5,7,5,12,13,7,12,11
                    </div>
                    <ul className="dashboard-stat-list">
                      <li>
                        TODAY
                        <span className="pull-right">
                          <b>1 200</b> <small>USERS</small>
                        </span>
                      </li>
                      <li>
                        YESTERDAY
                        <span className="pull-right">
                          <b>3 872</b> <small>USERS</small>
                        </span>
                      </li>
                      <li>
                        LAST WEEK
                        <span className="pull-right">
                          <b>26 582</b> <small>USERS</small>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- #END# Visitors --> */}
              {/* <!-- Latest Social Trends --> */}
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div className="card">
                  <div className="body bg-cyan">
                    <div className="m-b--35 font-bold">
                      LATEST SOCIAL TRENDS
                    </div>
                    <ul className="dashboard-stat-list">
                      <li>
                        #socialtrends
                        <span className="pull-right">
                          <i className="material-icons">trending_up</i>
                        </span>
                      </li>
                      <li>
                        #materialdesign
                        <span className="pull-right">
                          <i className="material-icons">trending_up</i>
                        </span>
                      </li>
                      <li>#adminbsb</li>
                      <li>#freeadmintemplate</li>
                      <li>#bootstraptemplate</li>
                      <li>
                        #freehtmltemplate
                        <span className="pull-right">
                          <i className="material-icons">trending_up</i>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- #END# Latest Social Trends --> */}
              {/* <!-- Answered Tickets --> */}
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div className="card">
                  <div className="body bg-teal">
                    <div className="font-bold m-b--35">ANSWERED TICKETS</div>
                    <ul className="dashboard-stat-list">
                      <li>
                        TODAY
                        <span className="pull-right">
                          <b>12</b> <small>TICKETS</small>
                        </span>
                      </li>
                      <li>
                        YESTERDAY
                        <span className="pull-right">
                          <b>15</b> <small>TICKETS</small>
                        </span>
                      </li>
                      <li>
                        LAST WEEK
                        <span className="pull-right">
                          <b>90</b> <small>TICKETS</small>
                        </span>
                      </li>
                      <li>
                        LAST MONTH
                        <span className="pull-right">
                          <b>342</b> <small>TICKETS</small>
                        </span>
                      </li>
                      <li>
                        LAST YEAR
                        <span className="pull-right">
                          <b>4 225</b> <small>TICKETS</small>
                        </span>
                      </li>
                      <li>
                        ALL
                        <span className="pull-right">
                          <b>8 752</b> <small>TICKETS</small>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- #END# Answered Tickets --> */}
            </div>

            <div className="row clearfix">
              {/* <!-- Task Info --> */}
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <div className="card">
                  <div className="header">
                    <h2>TASK INFOS</h2>
                    <ul className="header-dropdown m-r--5">
                      <li className="dropdown">
                        <Link
                          to=""
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="material-icons">more_vert</i>
                        </Link>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <Link to="">Action</Link>
                          </li>
                          <li>
                            <Link to="">Another action</Link>
                          </li>
                          <li>
                            <Link to="">Something else here</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="body">
                    <div className="table-responsive">
                      <table className="table table-hover dashboard-task-infos">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Manager</th>
                            <th>Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Task A</td>
                            <td>
                              <span className="label bg-green">Doing</span>
                            </td>
                            <td>John Doe</td>
                            <td>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-green"
                                  role="progressbar"
                                  aria-valuenow="62"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: "62%" }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Task B</td>
                            <td>
                              <span className="label bg-blue">To Do</span>
                            </td>
                            <td>John Doe</td>
                            <td>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-blue"
                                  role="progressbar"
                                  aria-valuenow="40"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: "40%" }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Task C</td>
                            <td>
                              <span className="label bg-light-blue">
                                On Hold
                              </span>
                            </td>
                            <td>John Doe</td>
                            <td>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-light-blue"
                                  role="progressbar"
                                  aria-valuenow="72"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: "72%" }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Task D</td>
                            <td>
                              <span className="label bg-orange">
                                Wait Approvel
                              </span>
                            </td>
                            <td>John Doe</td>
                            <td>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-orange"
                                  role="progressbar"
                                  aria-valuenow="95"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: "95%" }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Task E</td>
                            <td>
                              <span className="label bg-red">Suspended</span>
                            </td>
                            <td>John Doe</td>
                            <td>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-red"
                                  role="progressbar"
                                  aria-valuenow="87"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: "87%" }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- #END# Task Info --> */}
              {/* <!-- Browser Usage --> */}
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div className="card">
                  <div className="header">
                    <h2>BROWSER USAGE</h2>
                    <ul className="header-dropdown m-r--5">
                      <li className="dropdown">
                        <Link
                          to=""
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="material-icons">more_vert</i>
                        </Link>
                        <ul className="dropdown-menu pull-right">
                          <li>
                            <Link to="">Action</Link>
                          </li>
                          <li>
                            <Link to="">Another action</Link>
                          </li>
                          <li>
                            <Link to="">Something else here</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="body">
                    <div
                      id="donut_chart"
                      className="dashboard-donut-chart"
                    ></div>
                  </div>
                </div>
              </div>
              {/* <!-- #END# Browser Usage --> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
