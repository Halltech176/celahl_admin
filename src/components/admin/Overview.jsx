import { useEffect, useState } from "react";
import "./admin.css";
import Admin from "./admin";
import { Users, GetAgent } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, animateScroll as scroll } from "react-scroll";
import Loader from "../Common/Loader";
import { ErrorNotification } from "../Common/ErrorToast";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import axios from "axios";

const Overview = () => {
  useEffect(() => {
    dispatch(Users());
  }, []);

  const GetUser = (id) => {
    navigate("/agent");
    window.localStorage.setItem("agent_id", JSON.stringify(id));
    dispatch(GetAgent(id));
  };
  const agent_id = JSON.parse(window.localStorage.getItem("agent_id"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.users);
  const {
    loading: userLoading,
    error: userError,
    user,
  } = useSelector((state) => state.agent);
  console.log(users);
  const showMore = () => {
    navigate("/all-agent");
  };
  useEffect(() => {
    dispatch(GetAgent(agent_id));
  }, []);

  const userSlice = users?.docs?.slice(0, Math.ceil(users?.totalDocs / 4));
  console.log(userSlice);
  const users_details = userSlice?.map((user, index) => {
    return (
      <nav className="users-details">
        <li>
          {user?.firstName} {user?.lastName}
        </li>
        <li>{user?.accountPlan}</li>
        {/* <li>{user?.email}</li> */}
        <li>{new Date(user?.updatedAt).toLocaleDateString()}</li>
        <li>Due Date</li>
        <li
          onClick={() => GetUser(user?._id)}
          style={{ cursor: "pointer" }}
          className={user?.status}
        >
          {user?.status}
        </li>
      </nav>
    );
  });
  return (
    <>
      {" "}
      {loading && !error ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Admin />
          <div className="all-users">
            <h2 className="total_text">Total Users: {users?.totalDocs}</h2>

            <div className="input-fields">
              <input type="text" placeholder="Search" />

              <button>Export</button>
            </div>
            <nav className="users-heading">
              <li>Agent Name</li>
              <li>Plan Type</li>
              <li>subscription Date</li>
              <li>Due Date</li>
              <li>Status</li>
            </nav>
            <div className="agents">{users_details}</div>
            <div classname="d-flex my-2 justify-content-end">
              <button onClick={showMore} className="btn btn-primary">
                Show More
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default Overview;
