import { combineReducers } from "redux";

// import all reducers here
import appointmentReducer from "./appointmentReducer";

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  appointments: appointmentReducer
});

// make the combined reducers available for import
export default reducers;
