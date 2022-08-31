import { NavLink } from "react-router-dom";
import "./admin.css";
const Admin = () => {
  return (
    <>
      <div className="admin-dashboard">
        <div className="admin-img">
          <img src="" alt="admin" />
        </div>
        <div className="admin-route">
          <NavLink to="/ ">Overview</NavLink>
          <NavLink to="/agent">Agent</NavLink>
          <NavLink to="/login">Logout</NavLink>
        </div>
      </div>
    </>
  );
};
export default Admin;
