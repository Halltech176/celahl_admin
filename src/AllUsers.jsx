// import { useEffect, useState } from "react";
// import "./components/admin/admin.css";
// import Admin from "./components/admin/admin";
// import { Users } from "./Redux/actions";
// import { getUser } from "./Redux/VerifyUserSlice";
// import { useDispatch, useSelector } from "react-redux";
// // import arrow_down from "../../../Assets/arrow_down1.png";

// import axios from "axios";
// const AllUsers = () => {
//   const [open, setOpen] = useState(false);
//   const [count, setCount] = useState(1);

//   const dispatch = useDispatch();
//   const getAllUsers = async () => {
//     try {
//       console.log(count);
//       const response = await dispatch(Users(count));
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const selector = useSelector((state) => state);
//   console.log(selector);
//   const {
//     allusers: { loading },
//   } = useSelector((state) => state);

//   console.log(loading);

//   const {
//     allusers: { user },
//   } = useSelector((state) => state);
//   if (user !== null) {
//     console.log(user);
//   }
//   const { docs } = user;
//   const users = docs.map((doc) => {
//     return (
//       <nav key={doc._id} className="users-details">
//         <li>
//           {doc.firstName} {doc.lastName}
//         </li>
//         <li>{doc.accountPlan}</li>
//         <li>{new Date(doc.updatedAt).toLocaleDateString()}</li>
//         <li>Due Date</li>
//         <li className={doc.status}>
//           {doc.status}

//           <span onClick={() => GetUser(doc._id)}>
//             x{/* <img src={arrow_down} alt="arrow_down" /> */}
//           </span>
//         </li>
//       </nav>
//     );
//   });

//   const GetUser = (id) => {
//     const user_detail = docs.find((user) => {
//       return user._id === id;
//     });
//     dispatch(getUser(user_detail));
//     setOpen(true);
//     console.log(user_detail);
//   };
//   const selector = useSelector((state) => state);
//   const user_detail = selector.user.user;

//   const updateUser = async (id, status) => {
//     try {
//       const token = window.JSON.parse(localStorage.getItem("token"));
//       const response = await axios.put(
//         `https://celahl.herokuapp.com/api//admin/status/${id}`,
//         { status: `${status === "active" ? "inactive" : "active"}` },
//         {
//           headers: {
//             Authorization: `Bearer ${token} `,
//           },
//         }
//       );
//       dispatch(getUser(response.data.data));
//       await dispatch(Users(count));
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const increaseCount = () => {
//     if (user.docs.length === 0) {
//       setCount(1);
//       dispatch(Users(count));
//     } else {
//       setCount(count + 1);
//       dispatch(Users(count));
//     }
//   };
//   const decreaseCount = () => {
//     setCount(count - 1);
//     dispatch(Users(count));
//   };

//   return (
//     <>
//       {loading ? (
//         <h1>loading...</h1>
//       ) : (
//         <div>
//           <Admin />

//           <div className="all-users">
//             <div className={`agent ${open && "toggle-show"} `}>
//               <h1 className="users-heading-text">Agent Dashboard</h1>

//               <div className="user-agent-dashboard">
//                 <div>
//                   <h3 className="user-status-label">
//                     Account Status: <label>{user_detail.status}</label>
//                   </h3>
//                   <h3 className="user-status-label">
//                     Name:{" "}
//                     <label>
//                       {user_detail.firstName} {user_detail.lastName}
//                     </label>
//                   </h3>
//                   <h3 className="user-status-label">
//                     Phone No: <label>{user_detail.phone}</label>
//                   </h3>
//                   <h3 className="user-status-label">
//                     Account Plan: <label>{user_detail.accountPlan}</label>
//                   </h3>
//                 </div>
//                 <div>
//                   <button
//                     onClick={() =>
//                       updateUser(user_detail._id, user_detail.status)
//                     }
//                     className={user_detail.status}
//                   >
//                     {user_detail.status}
//                     <span
//                       onClick={() => setOpen(false)}
//                       className="agent_toggle_btn"
//                     >
//                       x{/* <img src={arrow_down} alt="arrow_down" /> */}
//                     </span>
//                   </button>
//                   <span
//                     onClick={() => setOpen(false)}
//                     className="agent_toggle_btn1"
//                   >
//                     {/* <img src={arrow_down} alt="arrow_down" /> */}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="input-fields">
//               <input type="text" placeholder="Search" />
//               <input type="text" placeholder="Filter" />
//               <button>Export</button>
//             </div>
//             <nav className="users-heading">
//               <li>Agent Name</li>
//               <li>Plan Type</li>
//               <li>subscription Date</li>
//               <li>Due Date</li>
//               <li>Status</li>
//             </nav>
//             <div className="agent-users">{users}</div>
//             <div className="input-fields">
//               <button onClick={decreaseCount}>Preview</button>

//               <button onClick={increaseCount}>Next</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default AllUsers;
