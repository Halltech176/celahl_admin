import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("login", async (loginData) => {
  try {
    const response = await axios.post(
      "https://celahl.herokuapp.com/api/auth/login",
      loginData
    );

    return response.data.data;
  } catch (err) {
    throw err;
  }
});

export const Users = createAsyncThunk("users", async (page = 1) => {
  try {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      `https://celahl.herokuapp.com/api//admin/users?type=agent&limit=10&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});
