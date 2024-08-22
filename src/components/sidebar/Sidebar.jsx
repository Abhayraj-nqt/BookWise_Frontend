import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./Sidebar.css";

// Components
import Button from '../button/Button'

// Functions
import { logout } from "../../api/services/auth";
import { logoutUser } from "../../redux/auth/authActions";


const Sidebar = ({sidebarLinks}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    dispatch(logoutUser());
    navigate('/login');
  }

  return (
    <>
      <div className="sidebar">

        <div className="side-links">
          {sidebarLinks.map(item => (
            <Link to={item.url} key={`${item.name}-${item.id}`} className="side-link">
              <span>{<item.icon size={25} />}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="side-btn">
          <Button onClick={handleLogout} varient={'primary'} >Logout</Button>
        </div>

      </div>

      <div className="mobile-bar">
        <div className="mobile-bar-links">
          {sidebarLinks.map((item) => (
            <Link
              to={item.url}
              key={`${item.name}-${item.id}`}
              className="mobile-bar-link"
            >
              <div className="mobile-bar-link-name">{<item.icon size={20} />}</div>
              <div className="">{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
