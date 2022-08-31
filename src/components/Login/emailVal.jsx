import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const EmailVal = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios(
        `https://celahl.herokuapp.com/api//auth/request-reset-password?email=${email}`
      );
      console.log(response);
      if (response.status === 200 || response.status === 201)
        navigate("/forgottenPassword");
        console.log(response)
      // return response;
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <>
      <h4 className="verify-heading">Forgot Password</h4>
      <div className="verify-container">
        <label className="verify-text">
          Enter the email address tied to your celahl <br /> account to get
          started
        </label>
        <label className="verify-label">Email Address</label>
        <input
          className="verify-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <button className="verify-button" onClick={handleVerify}>
          Proceed
        </button>
        <label className="verify-btn" onClick={() => navigate(-1)}>
          Back
        </label>
      </div>
    </>
  );
};
export default EmailVal;
