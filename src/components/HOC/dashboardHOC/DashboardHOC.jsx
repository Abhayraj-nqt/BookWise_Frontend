import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// CSS
import "./DashboardHOC.css";

// Components
import Sidebar from "../../sidebar/Sidebar";

// Functions
import toast from '../../toast/toast'
import { getAllCategories } from "../../../api/services/category";
import { setCategories } from "../../../redux/category/categoryActions";

// Constants
import { adminSidebarLinks } from "../../../libs/constants";

const DashboardHOC = (Component) =>
  function HOC() {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //   loadCategories();
    // }, [])
  
    // const loadCategories = async () => {
    //   try {
        
    //     const { data } = await getAllCategories();
    //     dispatch(setCategories(data))
  
    //   } catch (error) {
    //     console.log(error);
    //     toast.error('Failed to fetch categories');
    //   }
    // }
  

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
