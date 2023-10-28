import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userImage from "../comman/images/user.png";
const SideBar = (props) => {
  const navigate = useNavigate();
  const usertype = "SUPER ADMIN";
  const admin_name = localStorage.getItem("admin_name") || "no name";
  const admin_email = localStorage.getItem("admin_email") || "demo@gmail.com";

  const logout = () => {
    localStorage.clear();

    navigate("/");

    window.location.reload();
  };

  function AddBodyClassFunction() {
    // document.body.classList.add('salmon');
    document.body.classList.remove("overlay-open");
    // document.body.classList.add("ls-closed");
  }

  return (
    <>
      <section>
        {/* <!-- Left Sidebar --> */}
        <aside id="leftsidebar" className={`sidebar ${props.newClass}`}>
          {/* <!-- User Info --> */}
          <div className="user-info">
            <div className="image">
              <img src={userImage} width="48" height="48" alt="User" />
            </div>
            <div className="info-container">
              <div
                className="name"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <h4>{admin_name}</h4>
              </div>
              <div className="email">{admin_email}</div>
              <div className="email">Type- {usertype}</div>
              <div className="btn-group user-helper-dropdown">
                <i
                  className="material-icons"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  keyboard_arrow_down
                </i>
                <ul className="dropdown-menu pull-right">
                  {/* <li role="separator" className="divider"></li> */}
                  {/* <li>
                    <Link to="">
                      <i className="material-icons">group</i>Followers
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <i className="material-icons">shopping_cart</i>Sales
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <i className="material-icons">favorite</i>Likes
                    </Link>
                  </li> */}
                  <li role="separator" className="divider"></li>
                  <li>
                    <Link onClick={() => logout()}>
                      <i className="material-icons">input</i>Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- #User Info --> */}
          {/* <!-- Menu --> */}
          <div className="menu">
            <ul className="list">
              <li className="header">MAIN NAVIGATION</li>
              <li
                onClick={() => {
                  AddBodyClassFunction();
                }}
              >
                <Link to="/home">
                  <i className="material-icons">home</i>
                  <span>Homes</span>
                </Link>
              </li>

              <li
                onClick={() => {
                  AddBodyClassFunction();
                }}
              >
                <Link to="/alladmin">
                  <i className="material-icons">account_box</i>
                  <span>Admin</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- #Menu --> */}
          {/* <!-- Footer --> */}
          <div className="legal">
            <div className="copyright">
              &copy; 2023 <Link to="">Document management system</Link>.
            </div>
            <div className="version">
              <b>Version: </b> 1.0.5
            </div>
          </div>
          {/* <!-- #Footer --> */}
        </aside>
        {/* <!-- #END# Left Sidebar --> */}
        {/* <!-- Right Sidebar --> */}
        <aside id="rightsidebar" className="right-sidebar">
          <ul className="nav nav-tabs tab-nav-right" role="tablist">
            <li role="presentation" className="active">
              <Link to="#skins" data-toggle="tab">
                SKINS
              </Link>
            </li>
            <li role="presentation">
              <Link to="#settings" data-toggle="tab">
                SETTINGS
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div
              role="tabpanel"
              className="tab-pane fade in active in active"
              id="skins"
            >
              <ul className="demo-choose-skin">
                <li data-theme="red" className="active">
                  <div className="red"></div>
                  <span>Red</span>
                </li>
                <li data-theme="pink">
                  <div className="pink"></div>
                  <span>Pink</span>
                </li>
                <li data-theme="purple">
                  <div className="purple"></div>
                  <span>Purple</span>
                </li>
                <li data-theme="deep-purple">
                  <div className="deep-purple"></div>
                  <span>Deep Purple</span>
                </li>
                <li data-theme="indigo">
                  <div className="indigo"></div>
                  <span>Indigo</span>
                </li>
                <li data-theme="blue">
                  <div className="blue"></div>
                  <span>Blue</span>
                </li>
                <li data-theme="light-blue">
                  <div className="light-blue"></div>
                  <span>Light Blue</span>
                </li>
                <li data-theme="cyan">
                  <div className="cyan"></div>
                  <span>Cyan</span>
                </li>
                <li data-theme="teal">
                  <div className="teal"></div>
                  <span>Teal</span>
                </li>
                <li data-theme="green">
                  <div className="green"></div>
                  <span>Green</span>
                </li>
                <li data-theme="light-green">
                  <div className="light-green"></div>
                  <span>Light Green</span>
                </li>
                <li data-theme="lime">
                  <div className="lime"></div>
                  <span>Lime</span>
                </li>
                <li data-theme="yellow">
                  <div className="yellow"></div>
                  <span>Yellow</span>
                </li>
                <li data-theme="amber">
                  <div className="amber"></div>
                  <span>Amber</span>
                </li>
                <li data-theme="orange">
                  <div className="orange"></div>
                  <span>Orange</span>
                </li>
                <li data-theme="deep-orange">
                  <div className="deep-orange"></div>
                  <span>Deep Orange</span>
                </li>
                <li data-theme="brown">
                  <div className="brown"></div>
                  <span>Brown</span>
                </li>
                <li data-theme="grey">
                  <div className="grey"></div>
                  <span>Grey</span>
                </li>
                <li data-theme="blue-grey">
                  <div className="blue-grey"></div>
                  <span>Blue Grey</span>
                </li>
                <li data-theme="black">
                  <div className="black"></div>
                  <span>Black</span>
                </li>
              </ul>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="settings">
              <div className="demo-settings">
                <p>GENERAL SETTINGS</p>
                <ul className="setting-list">
                  <li>
                    <span>Report Panel Usage</span>
                    <div className="switch">
                      {/* <label>
                                      <span ><input type="checkbox" checked><span className="lever"/>
                                        </span></label> */}
                    </div>
                  </li>
                  <li>
                    <span>Email Redirect</span>
                    {/* <div className="switch">
                                    <label><input type="checkbox"><span className="lever"/></span></label>
                                </div> */}
                  </li>
                </ul>
                <p>SYSTEM SETTINGS</p>
                <ul className="setting-list">
                  <li>
                    <span>Notifications</span>
                    <div className="switch">
                      {/* <label><input type="checkbox" checked><span className="lever"/></span></label> */}
                    </div>
                  </li>
                  <li>
                    <span>Auto Updates</span>
                    <div className="switch">
                      {/* <label><input type="checkbox" checked><span className="lever"/></span></label> */}
                    </div>
                  </li>
                </ul>
                <p>ACCOUNT SETTINGS</p>
                <ul className="setting-list">
                  <li>
                    <span>Offline</span>
                    <div className="switch">
                      {/* <label><input type="checkbox"><span className="lever"/></span></label> */}
                    </div>
                  </li>
                  <li>
                    <span>Location Permission</span>
                    <div className="switch">
                      {/* <label><input type="checkbox" checked /><span className="lever"/>
                                    </span><label> */}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        {/* <!-- #END# Right Sidebar --> */}
      </section>
    </>
  );
};

export default SideBar;
