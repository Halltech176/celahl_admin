import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./UsersSlice";
import { loginReducer } from "./loginSlice";
import user from "./VerifyUserSlice";

const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  login: loginReducer,
  users: UserReducer,
  user,
});
const persistedReducers = persistReducer(persistConfig, reducers);
const Store = configureStore({
  reducer: persistedReducers,
});
export default Store;
