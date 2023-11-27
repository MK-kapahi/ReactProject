import { ActionStates } from "./ActionState";

export const getUsersData = (payload) => {
  return {
    type: ActionStates.GET_ALL_USERS_DATA,
    payload,
  };
};

export const setUserData = (payload) => {
  return {
    type: ActionStates.SET_USER_DATA,
    payload,
  };
};

export const addnewUser = (payload) => {
  console.log("dtgdjnbvjhgugj", payload);
  return {
    type: ActionStates.ADD_NEW_USER,
    payload,
  };
};
