import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "../actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Common/Loader";

export const AdminAuth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(User());
  }, []);
  const token = JSON.parse(window.localStorage.getItem("token"));
  const { user, loading, error } = useSelector((state) => state?.userProfile);
  if (token !== null) {
    if (loading && user === null) {
      return <Loader />;
    }
    if (!loading && !error && user !== null) {
      return children;
    } else {
      console.log("error");
    }
  } else {
    return <Navigate to="/login" />;
  }
};
