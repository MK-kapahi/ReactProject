import axios from "axios";
import { takeLatest, put, all } from "redux-saga/effects";
import { ActionStates } from "../Actions/ActionState";
import { getUsers } from "../Actions";
import { URL, route } from "../../Shared/Constant";


function* getUser  (payload) {
    try {

        const option = {
            withCredentials: 'include',
        }
        const res = yield axios.get(
            URL + route.GET, option
        );
        console.log(res?.data, "user data")
        yield put(getUsers(res.data))
    } catch (error) {
        console.log(error, "error in adding vehicle")
    }
}

function* Saga() {
    yield all([
        takeLatest(ActionStates.GET_ALL_USERS_DATA, getUser)
    ])
}

export default Saga;