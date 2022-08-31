import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./UserSlice";
import { loginReducer } from "./loginSlice";
import { AllUserReducer } from "./AllUserSlice";
import { PropertyReducer } from "./PropertiesSlice";
import VerifyUser from "./VerifyUserSlice";
import candidateReducer from "./slices/userStates";

const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  userDetails: UserReducer,
  login: loginReducer,
  allusers: AllUserReducer,
  properties: PropertyReducer,
  user: VerifyUser,
  candidate : candidateReducer
});
const persistedReducers = persistReducer(persistConfig, reducers);
const Store = configureStore({
  reducer: persistedReducers,
});
export default Store;
