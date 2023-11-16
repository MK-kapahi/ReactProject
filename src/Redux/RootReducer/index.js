import { combineReducers } from "redux";

import { GET_USER_REDUCER } from '../Reducers/index'

const appReducer = combineReducers({
    reducer: GET_USER_REDUCER
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;