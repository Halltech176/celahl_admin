import { useEffect, useState } from "react";
import "./admin.css";
import Admin from "./admin";
import { Users } from "../../Redux/actions";
import { getUser } from "../../Redux/VerifyUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, animateScroll as scroll } from "react-scroll";
// import arrow_down from "../../../Assets/arrow_down1.png";
import axios from "axios";
const AllUsers = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const selector = useSelector((state) => state);
  const paginate = useSelector((state) => state.users);
  console.log(user.page);

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
  const increaseCount = () => {
    if (user.docs.length === 0) {
      setCount(1);
      dispatch(Users(count));
    } else {
      setCount(count + 1);
      dispatch(Users(count));
    }
  };
  const decreaseCount = () => {
    setCount(count - 1);
    dispatch(Users(count));
  };
  const paginatePage = async (page_num) => {
    await dispatch(Users(page_num));
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
  const users = user.docs.map((user, index) => {
    return (
      <nav className="users-details">
        <li>{index}</li>
        <li>
          {user.firstName} {user.lastName}
        </li>
        <li>{user.accountPlan}</li>
        {/* <li>{user.email}</li> */}
        <li>{new Date(user.updatedAt).toLocaleDateString()}</li>
        <li>Due Date</li>
        <li className={user.status}>
          {user.status}
          <Link
            to="agent"
            spy={true}
            smooth={true}
            // offset={-70}
            duration={100}
          >
            <span onClick={() => GetUser(user._id)}>
              x{/* <img src={arrow_down} alt="arrow_down" /> */}
            </span>
          </Link>
        </li>
      </nav>
    );
  });

  return (
    <>
      {paginate.loading ? (
        <h1>loading...</h1>
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
                {user_detail === null ? (
                  ""
                ) : (
                  <div className="user-agent-dashboard">
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
              <button onClick={decreaseCount}>Preview</button>
              <ul className="pagination">
                {user.docs.map((_, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => paginatePage(index)}
                      className={`paginate-list ${
                        user.page === index ? "active_page" : ""
                      }`}
                    >
                      {index + 1}
                    </li>
                  );
                })}
              </ul>
              <button onClick={increaseCount}>Next</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AllUsers;
