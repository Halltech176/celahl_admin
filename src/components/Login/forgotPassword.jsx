import axios from "axios";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { ErrorNotification } from "../../Common/ErrorToast";
import { userCredential } from "../../../Redux/slices/userStates";
const ForgotPassword = () => {
  const dispatch = useDispatch()
  const [token, setToken] = useState("");
  const [newPassword, setPassword] = useState("");
  const navigate = useNavigate();
  const data = {
    token,
    newPassword,
  };
  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://celahl.herokuapp.com/api//auth/reset-password",
        data
      );
      if (response.status === 200 || response.status === 201) {
         console.log(response);
        navigate("/properties");
      }
      dispatch(userCredential(response.data.data))
      console.log(response.data.data);

      return response;
    } catch (err) {
      if(err.message === 'Network Error') {
        ErrorNotification("please check your internet connection");
      }
      ErrorNotification(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer transition={Zoom} autoClose={1500} />
      <h4 className="verify-heading">Reset Password</h4>
      <div className="verify-container">
        <label className="verify-label">Enter token</label>
        <input
          type="number"
          value={token}
          className="verify-input"
          onChange={(e) => setToken(e.target.value)}
        />
        <label className="verify-label">Enter New Password</label>
        <input
          type="password"
          value={newPassword}
          className="verify-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="verify-button" onClick={changePassword}>
          change password
        </button>
      </div>
    </>
  );
};
export default ForgotPassword;
