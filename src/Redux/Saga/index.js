import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import { URL, route } from "../../Shared/Constant";
import { setUserData } from "../Actions";
import { ActionStates } from "../Actions/ActionState";
// import { act } from "react-dom/test-utils";
// import { GET_USER_REDUCER } from "../Reducers";

function* addUser(payload) {
  console.log(payload?.payload);

  try {
    const option = {
      withCredentials: "include",
    };
    const res = yield axios.post(URL + route.POST, payload?.payload, option);

    // const action = {
    //     type: ActionStates.SET_USER_DATA,
    //     payload: res?.data
    // }
    console.log(res, "user data");
    // yield put(setUserData(action));
  } catch (error) {
    console.log(error, "error in adding user");
  }
}
function* getUser(payload) {
  console.log(payload);

  try {
    const option = {
      withCredentials: "include",
    };
    const res = yield axios.get(URL + route.GET, option);

    const action = {
      type: ActionStates.SET_USER_DATA,
      payload: res?.data,
    };
    console.log(res?.data, "user data");
    yield put(setUserData(action));
  } catch (error) {
    console.log(error, "error in adding vehicle");
  }
}

function* Saga() {
  yield all([
    takeLatest(ActionStates.GET_ALL_USERS_DATA, getUser),
    takeLatest(ActionStates.ADD_NEW_USER, addUser),
  ]);
}

export default Saga;
