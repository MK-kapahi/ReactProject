import { combineReducers } from "redux";

import { GET_USER_REDUCER } from '../Reducers/getUserReducer'
import { GET_SINGLE_USER_REDUCER } from "../Reducers/getSingleUserReducer";
import { SET_SEARCHE_REDUCER } from "../Reducers/setSearchedUserReducer";
import { SET_PRODUCTS_REDUCER } from "../Reducers/setProductsReducer";


const appReducer = combineReducers({
    registerReducer: GET_USER_REDUCER,
    setSearchedReducer : SET_SEARCHE_REDUCER,
    productsReducer : SET_PRODUCTS_REDUCER, 
    singleUserReducer : GET_SINGLE_USER_REDUCER
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;