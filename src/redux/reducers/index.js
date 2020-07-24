import { combineReducers } from "redux";
import userReducer from "./user";
import cifData from "./cifdata"


export default combineReducers({
  user: userReducer,
  cif : cifData,
});
