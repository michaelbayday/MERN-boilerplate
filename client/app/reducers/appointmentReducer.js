import * as types from "../actionTypes/constants";
const initialState = {
  showAppointmentModal: false,
  showUserLookupModal: false,
  showEditModal: false,
  userAppointments: {},
  currentAppointment: {}
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_APPOINTMENT_MODAL:
      return {
        ...state,
        showAppointmentModal: action.payload
      };
    case types.SHOW_USER_LOOKUP_MODAL:
      return {
        ...state,
        showUserLookupModal: action.payload
      };
    case types.TOGGLE_EDIT_MODAL:
      return {
        ...state,
        showEditModal: action.payload
      };
    case types.EDIT_CURRENT_DATE:
      const currentCopy = Object.assign({}, state.currentAppointment);
      currentCopy.date = action.payload;
      currentCopy.dateTime = currentCopy.date + " " + currentCopy.time;
      return {
        ...state,
        currentAppointment: Object.assign({}, currentCopy)
      };
    case types.STORE_USER_APPOINTMENT_INFORMATION:
      const appointments = Object.assign({}, action.payload);
      return {
        ...state,
        userAppointments: appointments
      };
    case types.STORE_APPOINTMENT_INFORMATION:
      return {
        ...state,
        currentAppointment: Object.assign(
          {},
          state.userAppointments[action.payload]
        )
      };
    default:
      return state;
  }
};

export default appointmentReducer;
