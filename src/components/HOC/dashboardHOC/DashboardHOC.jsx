import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./DashboardHOC.css";

// Components
import Sidebar from "../../sidebar/Sidebar";

// Constants
import { adminSidebarLinks } from "../../../libs/constants";

const DashboardHOC = (Component) =>
  function HOC() {

    return (
      <div className="dashboard-hoc">
          <Sidebar sidebarLinks={adminSidebarLinks} />
        <div className="dash-area">
          <Component />
        </div>
      </div>
    );
  };

export default DashboardHOC;
