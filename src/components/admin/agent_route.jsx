import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import Admin from "./admin";
import { Users } from "../../Redux/actions";
import { GetAgent } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, animateScroll as scroll } from "react-scroll";
import Loader from "../Common/Loader";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification, InfoNotification } from "../Common/ErrorToast";
import axios from "axios";
import ReactToPdf from "react-to-pdf";

const Agent = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { agent, loading, error } = useSelector((state) => state.agent);
  const selector = useSelector((state) => state);
  console.log(selector?.agent?.agent);

  const agent_id = JSON.parse(window.localStorage.getItem("agent_id"));
  console.log(agent_id);
  useEffect(() => {
    dispatch(GetAgent(agent_id));
  }, []);

  const updateUser = async (id, status) => {
    try {
      const token = window.JSON.parse(localStorage.getItem("token"));
      const response = await axios.put(
        `https://celahl.herokuapp.com/api//admin/status/${id}`,
        { status: `${status === "active" ? "inactive" : "active"}` },
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      InfoNotification(response?.data?.message);
      setTimeout(() => {
        dispatch(GetAgent(id));
      }, 1000);

      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  let amountFormat = Intl.NumberFormat("en-US");
  const users_details = agent?.wallet?.histories?.map((user, index) => {
    return (
      <nav className="users-details">
        <li>{new Date(user?.updatedAt).toLocaleDateString()}</li>
        <li>{user?._id}</li>
        <li>&#8358;{amountFormat.format(user?.amount)}.00</li>

        {/* <li>{user?.email}</li> */}

        <li>{user?.description}</li>
      </nav>
    );
  });
  console.log(users_details);

  return (
    <>
      <ToastContainer transition={Zoom} autoClose={800} />
      {loading && !error ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {agent_id === null ? (
            <div className="no_user">
              <h1>No Agent Selected yet</h1>
              <button
                onClick={() => navigate("/all-agent")}
                className=" btn btn-outline-primary"
              >
                Overview
              </button>
            </div>
          ) : (
            <div>
              <Admin />
              <div className="all-users">
                <div className="user-agent-dashboard" id="agent">
                  <div>
                    <h3 className="user-status-label">
                      Account Status: <label>{agent?.status}</label>
                    </h3>
                    <h3 className="user-status-label">
                      Name:
                      <label>
                        {agent?.firstName} {agent?.lastName}
                      </label>
                    </h3>
                    <h3 className="user-status-label">
                      Phone No: <label>{agent?.phone}</label>
                    </h3>
                    <h3 className="user-status-label">
                      Account Plan: <label>{agent?.accountPlan} </label>
                    </h3>
                  </div>

                  <div className="toggle-container ">
                    <h3> change status </h3>
                    <button
                      onClick={() => updateUser(agent?._id, agent?.status)}
                      className={agent?.status}
                    >
                      {agent?.status}
                    </button>
                  </div>
                </div>

                <h2 className="total_text">Transaction</h2>
                <div className="input-fields">
                  <input type="text" placeholder="Search" />
                  <ReactToPdf targetRef={ref} filename="transactions.pdf">
                    {({ toPdf }) => <button onClick={toPdf}>Export</button>}
                  </ReactToPdf>
                </div>
                <nav className="users-heading">
                  <li>Date & Time</li>
                  <li>Payment ID</li>
                  <li>Amount</li>

                  <li>Payment For</li>
                </nav>
                <div ref={ref}>
                  {agent?.wallet?.histories.length === 0 ? (
                    <div className="d-flex no_transaction py-5 flex-column my-5 align-items-center justify-content-center">
                      <h1>No Transaction available</h1>
                    </div>
                  ) : (
                    users_details
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};
export default Agent;
