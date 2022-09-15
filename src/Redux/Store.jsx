import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UsersReducer } from "./slices/UsersSlice";
import { UserReducer } from "./slices/UserSlice";
import { GetAgentReducer } from "./slices/AgentSlice";
import { loginReducer } from "./slices/loginSlice";
import { SettingsReducer } from "./slices/SettingsSlice";
import { BanksReducer } from "./slices/BankSlice";

const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  login: loginReducer,
  users: UsersReducer,
  userProfile: UserReducer,
  agent: GetAgentReducer,
  settings: SettingsReducer,
  banks: BanksReducer,
});
const persistedReducers = persistReducer(persistConfig, reducers);
const Store = configureStore({
  reducer: persistedReducers,
});
export default Store;
