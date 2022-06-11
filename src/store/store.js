import { createStore, combineReducers } from "redux";
import { lockReducer } from "./reducer.js";

const store = createStore(
  combineReducers({
    lock: lockReducer,
  })
);

export default store;
