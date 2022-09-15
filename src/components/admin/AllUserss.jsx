import { useEffect, useState } from "react";
import "./admin.css";
import Admin from "./admin";
import { Users } from "../../Redux/actions";
import { getUser } from "../../Redux/slices/AgentASlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, animateScroll as scroll } from "react-scroll";
import Loader from "../Common/Loader";
import { ErrorNotification } from "../Common/ErrorToast";
import { motion } from "framer-motion";
import axios from "axios";
const AllUsers = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const selector = useSelector((state) => state);
  const paginate = useSelector((state) => state.users);
  const items = useSelector((state) => state.users);
  console.log(items);

  // const getAllUsers = async () => {}
  const GetUser = (id) => {
    const user_detail = user.docs.find((user) => {
      return user._id === id;
    });
    dispatch(getUser(user_detail));
    setOpen(true);
    console.log(user_detail);
  };
  const user_detail = selector.user.user;

  console.log(user_detail);

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
      dispatch(getUser(response.data.data));
      await dispatch(Users(count));
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleIncrease = async () => {
    try {
      setCount(count + 1);

      if (count === items.totalPages) {
        setCount(1);
      }
      if (items.error === "unable to fetch data") {
        throw "please check your internet connection";
      }

      // await dispatch(AllProperties(1));
      const response = await dispatch(Users(count));
      console.log(response);
    } catch (err) {
      ErrorNotification(err);
      console.error(err);
    }
  };

  const handleDecrease = async () => {
    try {
      setCount(count - 1);

      if (count === 1) {
        setCount(items.totalPages);
      }

      if (items.error === "unable to fetch data") {
        throw "please check your internet connection";
      }
      // await dispatch(Users(1));
      await dispatch(Users(count));
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handlePaginate = async (index) => {
    try {
      setCount(index);

      if (items.error === "unable to fetch data") {
        throw "please check your internet connection";
      }
      // await dispatch(Users(1));
      await dispatch(Users(count));
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const FilterUser = async (page = 1) => {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      `https://celahl.herokuapp.com/api//admin/users?type=agent&limit=10&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
  };
  console.log(user);
  const users = user.docs.map((user, index) => {
    return (
      <nav className="users-details">
        <li>{(index + 1) * user.page}</li>
        <li>
          {user.firstName} {user.lastName}
        </li>
        <li>{user.accountPlan}</li>
        {/* <li>{user.email}</li> */}
        <li>{new Date(user.updatedAt).toLocaleDateString()}</li>
        <li>Due Date</li>
        <li style={{ cursor: "pointer" }} className={user.status}>
          {user.status}
        </li>
      </nav>
    );
  });

  return (
    <>
      {paginate.loading ? (
        <Loader />
      ) : (
        <div>
          <Admin />
          <div className="all-users">
            <div
              className={`agent ${open && "toggle-show"} `}
              id="agent"
              title="agent"
            >
              <h1 className="users-heading-text">Agent Dashboard</h1>
              <div className="">
                {!isOpen ? (
                  ""
                ) : (
                  <div className="user-agent-dashboard" id="agent">
                    <div>
                      <h3 className="user-status-label">
                        Account Status: <label>{user_detail.status}</label>
                      </h3>
                      <h3 className="user-status-label">
                        Name:
                        <label>
                          {user_detail.firstName} {user_detail.lastName}
                        </label>
                      </h3>
                      <h3 className="user-status-label">
                        Phone No: <label>{user_detail.phone}</label>
                      </h3>
                      <h3 className="user-status-label">
                        Account Plan: <label>{user_detail.accountPlan} </label>
                      </h3>
                    </div>

                    <div className="toggle-container">
                      <button
                        onClick={() =>
                          updateUser(user_detail._id, user_detail.status)
                        }
                        className={user_detail.status}
                      >
                        {user_detail.status}
                      </button>
                      <span
                        onClick={() => setOpen(false)}
                        className="agent_toggle_btn1"
                      >
                        x
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="input-fields">
              <input type="text" placeholder="Search" />
              <input type="text" placeholder="Filter" />
              <button>Export</button>
            </div>
            <nav className="users-heading">
              <li>Agent Name</li>
              <li>Plan Type</li>
              <li>subscription Date</li>
              <li>Due Date</li>
              <li>Status</li>
            </nav>
            <div className="agents">{users}</div>
            <div className="input-fields">
              <button onClick={handleDecrease}>Preview</button>
              <ul className="d-flex align-items-center">
                {user.doc.map((doc, index) => {
                  return index < items.totalPages ? (
                    <li
                      key={index}
                      onClick={() => handlePaginate(index + 1)}
                      className="mx-2"
                    >
                      {index + 1}
                    </li>
                  ) : (
                    ""
                  );
                })}
              </ul>

              <button onClick={handleIncrease}>Next</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AllUsers;
