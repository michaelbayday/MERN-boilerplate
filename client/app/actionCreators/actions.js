import * as types from "../actionTypes/constants";

export const toggleAppointmentModal = show => {
  return {
    type: types.TOGGLE_APPOINTMENT_MODAL,
    payload: show
  };
};

export const toggleUserLookupModal = show => {
  return {
    type: types.SHOW_USER_LOOKUP_MODAL,
    payload: show
  };
};

export const toggleEditModal = show => {
  return {
    type: types.TOGGLE_EDIT_MODAL,
    payload: show
  };
};

export const storeUserAppointmentInformation = appointments => {
  return {
    type: types.STORE_USER_APPOINTMENT_INFORMATION,
    payload: appointments
  };
};

export const storeAppointmentInformation = id => {
  return {
    type: types.STORE_APPOINTMENT_INFORMATION,
    payload: id
  };
};

// export const loadRecipes = () => {
//   return {
//     type: types.LOAD_RECIPES
//   };
// };

// export const logInput = input => {
//   return {
//     type: types.LOG_INPUT,
//     payload: input
//   };
// };

// export const faveRecipe = recipeId => {
//   console.log('fave');
//   return {
//     type: types.FAVE_RECIPE,
//     payload: recipeId
//   };
// };
