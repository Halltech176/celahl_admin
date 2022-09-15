import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import "./admin.css";
import { MdMenu, MdClose } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import Icon1 from "../../assets/icon-1.png";
import Icon2 from "../../assets/icon-2.png";
import Icon3 from "../../assets/icon-3.png";
import { useSelector } from "react-redux";
import SiteLogo from "../../assets/DarkLogo.png";
const Admin = () => {
  const { user, loading, error } = useSelector((state) => state.userProfile);
  // const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const variants = {
    open: { display: "block", x: 0 },
    closed: { display: "none", x: "-100%" },
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  console.log(isOpen);
  return (
    <>
      <div className="d-flex sidebar_container align-items-center justify-content-between">
        <img src={SiteLogo} width="100px" alt="website-logo" />
        {isOpen ? (
          <MdMenu
            className="sidebar_btn  text-primary"
            size="2rem"
            onClick={handleToggle}
          />
        ) : (
          <MdClose
            size="2rem"
            className="sidebar_btn  text-primary"
            onClick={handleToggle}
          />
        )}
      </div>
      <motion.div className={`${isOpen && "show_bar"} adminDashboard`}>
        <div className="admin-img">
          <p className="profile-text">
            {user?.firstName} {user?.lastName}
          </p>
          {/* <img src="" alt="admin" /> */}
        </div>
        <div className="admin-route">
          <div className="link-flex">
            <img src={Icon3} alt="icon3" />
            <NavLink to="/ ">Overview</NavLink>
          </div>
          <div className="link-flex">
            <FaUserCheck
              size="2rem"
              className="me-1  text-white"
              style={{}}
              color="white"
              // onClick={handleToggle}
            />

            <NavLink to="/agent">Agent</NavLink>
          </div>
          <div className="link-flex">
            <img src={Icon2} alt="icon2" />
            {/* GrUserExpert */}
            <NavLink to="/login">Logout</NavLink>
          </div>
          <div className="link-flex">
            <IoMdSettings
              size="2rem"
              className="me-1  text-white"
              // onClick={handleToggle}
            />

            <NavLink to="/settings">Settings</NavLink>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default Admin;
