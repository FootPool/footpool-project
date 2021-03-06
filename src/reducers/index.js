import { combineReducers } from "redux";
import user from "./user";
import pools from "./pools";
import poolDetails from "./poolDetails";
import profileReducer from "./profileReducer";
import createPoolReducer from "./createPoolReducer";

export default combineReducers({
  user,
  pools,
  poolDetails,
  profileReducer,
  createPoolReducer
});
