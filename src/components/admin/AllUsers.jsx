import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./admin.css";
import Admin from "./admin";
// import { Users } from "../../Redux/actions";
import { GetAgent, Users } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link, animateScroll as scroll } from "react-scroll";
import Loader from "../Common/Loader";
import { ErrorNotification } from "../Common/ErrorToast";
import axios from "axios";

const AllUsers = () => {
  useEffect(() => {
    dispatch(Users());
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.users);
  const {
    loading: userLoading,
    error: userError,
    agent,
  } = useSelector((state) => state.agent);
  console.log(agent);

  const [count, setCount] = useState(2);

  const GetUser = (id) => {
    window.localStorage.setItem("agent_id", JSON.stringify(id));
    navigate("/agent");

    dispatch(GetAgent(id));
  };

  const handleIncrease = async () => {
    setCount(count + 1);

    if (count === users?.totalPages) {
      setCount(1);
    }

    await dispatch(Users(count));
  };

  const handleDecrease = async () => {
    setCount(count - 1);

    if (count === 1) {
      setCount(users?.totalPages);
    }

    await dispatch(Users(count));
  };

  const handlePaginate = async (index) => {
    const response = await dispatch(Users(index));
  };

  const users_details = users?.docs.map((user, index) => {
    return (
      <nav className="users-details">
        <li>
          {user?.firstName} {user?.lastName}
        </li>
        <li>{user?.accountPlan}</li>
        {/* <li>{user?.email}</li> */}
        <li>{new Date(user?.updatedAt).toLocaleDateString()}</li>

        <li
          onClick={() => GetUser(user?._id)}
          style={{ cursor: "pointer" }}
          className={`${user?.status}`}
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
            <h2 className="total_text">Total Agents: {users?.totalDocs}</h2>

            <div className="input-fields">
              <input type="text" placeholder="Search" />

              <button>Export</button>
            </div>
            <nav className="users-heading">
              <li>Agent Name</li>
              <li>Plan Type</li>
              <li>subscription Date</li>
              <li>Status</li>
            </nav>
            <div className="agents">{users_details}</div>
            <div>
              {users?.totalPages === 1 ? (
                ""
              ) : (
                <div className="paginate-btns d-flex align-items-center justify-content-between my-3 flex-wrap ">
                  {users?.page === 1 ? (
                    <div> </div>
                  ) : (
                    <button className="paginate-btn" onClick={handleDecrease}>
                      prev
                    </button>
                  )}

                  <ul className="d-flex align-items-center">
                    {users?.docs?.map((doc, index) => {
                      // if(inde)
                      return index < users?.totalPages ? (
                        <li
                          key={index}
                          onClick={() => handlePaginate(index + 1)}
                          className={`${
                            users?.page === index + 1
                              ? "active_page"
                              : "inactive_page"
                          } mx-2`}
                        >
                          {index + 1}
                        </li>
                      ) : (
                        ""
                      );
                    })}
                  </ul>
                  {users?.page === users?.totalPages ? (
                    <div> </div>
                  ) : (
                    <button className="paginate-btn" onClick={handleIncrease}>
                      next
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default AllUsers;
