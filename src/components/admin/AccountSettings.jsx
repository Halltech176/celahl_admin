import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./admin.css";
import Admin from "./admin";
import { Users } from "../../Redux/actions";
import { GetAgent, BankAccounts } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link, animateScroll as scroll } from "react-scroll";
import Loader from "../Common/Loader";
import { ErrorNotification, SuccessNotification } from "../Common/ErrorToast";
import axios from "axios";
import { GetSettings } from "../../Redux/actions";
import { ToastContainer, Zoom } from "react-toastify";

const Settings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSettings());
    dispatch(BankAccounts());
  }, []);
  const { loading, settings, error } = useSelector((state) => state.settings);
  const [basic, setBasic] = useState(settings?.basicPlan);
  const [enterprise, setEnterprise] = useState(settings?.enterprisePlan);
  const [growth, setGrowth] = useState(settings?.growthPlan);
  const [accountName, setAccountName] = useState(settings?.accountName);
  const [accountNumber, setAccountNumber] = useState(settings?.accountNumber);
  const [bankCode, setBankCode] = useState(settings?.bankCode);
  const [bankName, setBankName] = useState(settings?.bankName);
  const [activeBank, setActiveBank] = useState("");

  const selector = useSelector((state) => state.banks);
  console.log(selector);

  //   const renderBanks = bankaccounts?.map((bank, index) => {
  //     return (
  //       <option key={index} value={bank?.name}>
  //         {bank?.name}
  //       </option>
  //     );
  //   });

  //   <select
  //   name="type"
  //   value={bank}
  //   onChange={(e) => setBank(e.target.value)}
  //   className="w-100  p-2"
  //   id=""
  // >
  //   {renderBanks}
  // </select>

  const UpdatePlan = async (e) => {
    e.preventDefault();
    try {
      const token = window.JSON.parse(localStorage.getItem("token"));
      const data = {
        referralBonusPercent: 50,
        minimumIOSVersion: 1.01,
        minimumAndroidVersion: 6.0,
        minimumBonusPayout: 3000,
        bankName: "UBA",
        accountName: "celahl",
        accountNumber: "2344",
        bankCode: "081",
        propertyCommission: "0",
        basicPlan: basic,
        growthPlan: growth,
        enterprisePlan: enterprise,
      };
      //   http://localhost:8089/api//settings
      console.log(data);
      const response = await axios.post(
        `https://celahl.herokuapp.com/api//settings`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      SuccessNotification(response.data.message);
      dispatch(GetSettings());
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(settings);

  return (
    <>
      <ToastContainer transition={Zoom} autoClose={800} />
      {loading && !error ? (
        <Loader />
      ) : (
        <div>
          <Admin />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="account_settings"
          >
            <h1>Account Settings</h1>
            <div className=" my-4">
              <form id="form-container" className={` plan-container `}>
                <div>
                  <div>
                    <div className="welcome text-left ">
                      <h4 className="text-center">update plan</h4>
                    </div>
                    <div className="my-5">
                      <label htmlFor="" className="form-label">
                        Basic
                      </label>
                      <input
                        value={basic}
                        onChange={(e) => setBasic(e.target.value)}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="">
                      <label htmlFor="" className="form-label">
                        Growth
                      </label>
                      <input
                        value={growth}
                        onChange={(e) => setGrowth(e.target.value)}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className=" my-5">
                      <label htmlFor="" className="form-label">
                        Enterprise
                      </label>
                      <input
                        value={enterprise}
                        onChange={(e) => setEnterprise(e.target.value)}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="welcome text-left ">
                      <h4 className="text-center">update Account</h4>
                    </div>
                    <div className="my-5">
                      <label htmlFor="" className="form-label">
                        Account Name
                      </label>
                      <input
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="my-5">
                      <label htmlFor="" className="form-label">
                        Account Number
                      </label>
                      <input
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="my-5">
                      <label htmlFor="" className="form-label">
                        Bank Code
                      </label>
                      <input
                        value={bankCode}
                        disabled
                        style={{ cursor: "no-edit" }}
                        onChange={(e) => setBankCode(e.target.value)}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="my-5">
                      <label htmlFor="" className="form-label">
                        Bank Name
                      </label>
                      <input
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={UpdatePlan}
                    className="btn update-btn btn-primary "
                  >
                    Update Plan
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
export default Settings;
