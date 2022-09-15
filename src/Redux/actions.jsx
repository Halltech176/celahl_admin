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
      `https://celahl.herokuapp.com/api//admin/users?type=agent&emailVerified=true&limit=10&page=${page}`,
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

export const User = createAsyncThunk("user", async (page = 1) => {
  try {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      `https://celahl.herokuapp.com/api//users/profile?populate=avatar`,
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

export const GetAgent = createAsyncThunk("agent", async (id) => {
  try {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      `https://celahl.herokuapp.com/api//data/user/${id}?populate=wallet&populate=wallet.histories`,
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
// http://localhost:8089/api//users/profile?populate=wallet&populate=bankAccounts&populate=referral&populate=avatar
export const BankAccounts = createAsyncThunk("bankaccounts", async () => {
  try {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      "https://celahl.herokuapp.com/api//wallet/banks",
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    // throw err;
    console.log(err);
  }
});

export const GetSettings = createAsyncThunk("settings", async () => {
  try {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      `https://celahl.herokuapp.com/api//settings`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
});
