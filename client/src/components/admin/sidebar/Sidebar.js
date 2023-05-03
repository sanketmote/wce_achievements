import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/actions/authAction";
import "./Sidebar.css";
import React, { useState } from "react";
import Main from "../main/main";
import AdminManagement from "../adminManagement/management";
// import Spam from "../spamManagement/Spam";
// import UsersManagement from "../usersManagement/UsersManagement";
// import VerifyUserPosts from "../verifyUserPosts/VerifyUserPosts";
import ExportAchievement from "../exportAchievement/exportAchievement";
import { AuthContext } from "../../../context/authContext"; 
import { useContext } from "react";
const Sidebar = () => {
  const { currentUser,logOut,isAdmin } = useContext(AuthContext);
  const [adminMenu, setAdminMenu] = useState(1);


  return (
    <>
      {adminMenu === 1 && <Main />}
      {adminMenu === 2 && <AdminManagement />}
      {/* {adminMenu === 3 && <Spam />} */}
      {/* {adminMenu === 4 && <UsersManagement />} */}
      {/* {adminMenu === 5 && <VerifyUserPosts />} */}
      {adminMenu === 6 && <ExportAchievement />}

      <div className="sidebar_responsive" id="sidebar">
        <div className="sidebar__title">
          <div className="sidebar__img">
            <h1>WCE ACHIEVEMENTS</h1>
          </div>
          <i className="fa fa-times" id="sidebarIcon" aria-hidden="true"></i>
        </div>

        <div className="sidebar__menu">
          <div
            className={`sidebar__link ${adminMenu === 1 && "active_menu_link"}`}
            onClick={() => setAdminMenu(1)}
          >
            <i className="fa fa-th"></i>
            <a href="#">Dashboard</a>
          </div>
          <h2>ADMIN CONTROL</h2>
          <div
            className={`sidebar__link ${adminMenu === 2 && "active_menu_link"}`}
            onClick={() => setAdminMenu(2)}
          >
            <i className="fa fa-lock" aria-hidden="true"></i>
            <a href="#">Admin Management</a>
          </div>

          <div
            className={`sidebar__link ${adminMenu === 6 && "active_menu_link"}`}
            onClick={() => setAdminMenu(6)}
          >
            <i className="fa fa-file-pdf"></i>
            <a href="#">Export Achievements</a>
          </div>

          {/* <div
            className={`sidebar__link ${adminMenu === 3 && "active_menu_link"}`}
            onClick={() => setAdminMenu(3)}
          >
            <i className="fa fa-ban"></i>
            <a href="#">Spams Management</a>
          </div> */}
{/* 
          <div
            className={`sidebar__link ${adminMenu === 4 && "active_menu_link"}`}
            onClick={() => setAdminMenu(4)}
          >
            <i className="fa fa-wrench"></i>
            <a href="#">Users Management</a>
          </div> */}

          <div
            className={`sidebar__link ${adminMenu === 5 && "active_menu_link"}`}
            onClick={() => setAdminMenu(5)}
          >
            <i className="fa fa-check" aria-hidden="true"></i>
            <a href="#">Verify User Posts</a>
          </div>

          {/* <div className="sidebar__link">
            <i className="fa fa-archive"></i>
            <a href="#">xyz</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-handshake-o"></i>
            <a href="#">xyz</a>
          </div> */}

          <div className="sidebar__logout">
            <i className="fa fa-power-off"></i>
            <Link to="/" onClick={logOut}>
              Log out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
