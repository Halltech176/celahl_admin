import React, { useState, useEffect } from "react";
import { login as signin, Users } from "../../Redux/actions";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import login from "./Login.module.css";
import Loader from "../Common/Loader";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification } from "../Common/ErrorToast";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("admin@celahl.com");
  const [password, setPassword] = useState("Admin@1234");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.users);
  const login_loader = useSelector((state) => state.login.loading);
  const credential = useSelector((state) => state.login);
  console.log(loading);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user_details = {
      password,
      username: email,
    };
    // console.log(user_details);
    try {
      const response = await dispatch(signin(user_details));
      console.log(response);
      if (response.type === "login/fulfilled") {
        // console.log(credential);
        const token = response.payload.token;
        window.localStorage.setItem("token", JSON.stringify(token));
        const users = await dispatch(Users());
      } else {
        throw new Error();
      }

      if (!loading) {
        navigate("/");
      }

      // console.log(users.payload.docs);
    } catch (err) {
      if (credential.error === "unable to fetch data") {
        ErrorNotification("Please check  your internet connections");
      }
      console.log(err.message);
    }
  };

  return (
    <>
      {loading || login_loader ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ToastContainer transition={Zoom} autoClose={800} />
          <div className="login my-5">
            <div className="container">
              <form
                id="form-container"
                className={`${login.login_container} row  g-3 mx-auto align-items-center justify-content-center`}
              >
                <div className="welcome text-left col-12 ">
                  <h4 className={`${login.heading_text}`}>Welcome back</h4>
                  <p className={`${login.welcome_text}`}>
                    Welcome back! Please enter your details
                  </p>
                </div>
                <div className="col-12">
                  <label htmlFor="" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className={`${login.verify} col-md-12`}>
                  <div className="checkbox ">
                    <input
                      type="checkbox"
                      value={password}
                      className="me-2"
                      name="checkbox"
                      id="checkbox"
                    />
                    <label htmlFor="" className="">
                      Remeber for 30 days
                    </label>
                  </div>
                  <div className="forgot_password">
                    <label className="forgot-password">
                      Forgotten Password
                    </label>
                  </div>
                </div>
                <div className="button_container col-md-12  text-center">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className={`${login.login_btn} w-100 btn btn-primary py-2 px-5`}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
      )
    </>
  );
};

export default Login;
