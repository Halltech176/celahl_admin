import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const AdminAuth = ({ children }) => {
  const selector = useSelector((state) => state.users);
  console.log(selector.user);
  if (selector.user === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }

  console.log(selector);
};
