import { combineReducers } from "redux";
import user from "./user";
import pools from "./pools";
import poolDetails from "./poolDetails";
import profileReducer from "./profileReducer";
import fixturesReducer from "./fixturesReducer";

export default combineReducers({
  user,
  pools,
  poolDetails,
  profileReducer,
  fixturesReducer
});
