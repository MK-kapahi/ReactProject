import axios from "axios";
import { takeLatest, put, all } from "redux-saga/effects";
import { ActionStates } from "../Actions/ActionState";
import { getUsersData, getSearchedUser, setUserData, setCurrentUser, setUser, setAllProdcts } from "../Actions";
import { URL, route } from "../../Shared/Constant";
import socket from "../../Service/socket";


const option = {
    withCredentials: 'include',
}

function* login(payload) {

    try {

        const res = yield axios.post(URL + route.LOGIN, payload?.payload?.data, option)
        console.log(res?.data?.data)
        if (res.status === 200) {
            payload?.payload?.successfullLogin(" Login Successfully ")

            const stringifiedObj = JSON.stringify(res?.data?.data)

            localStorage.setItem(
                "userInfo",
                stringifiedObj
            )
            socket.connect();
        }
    }

    catch (error) {
        payload?.payload?.errorfunction(error)
    }

}
function* updateUser(payload) {
    try {
        const res = yield axios.put(URL + route.UPDATE + "/" + payload?.payload?.id, payload?.payload?.formData, option)
        if (res.status === 200) {
            yield put(getUsersData({}))
            payload?.payload?.success("User Updated Successfully")
        }

    }
    catch (error) {
        console.log(error, "error in adding user")
    }


}

function* loadProducts(payload)
{
    const res = yield axios.get("https://dummyjson.com/products")
    console.log(res);

    yield put(setAllProdcts(res?.data))
}
function* deleteUser(payload) {
    try {
        const res = yield axios.delete(URL + route.DELETE + "/" + payload?.payload?.id, option);
        console.log(res, "user data")

        if (res.status === 200) {
            yield put(getUsersData({}))
            payload?.payload?.success("User Deleted Successfully ")
        }
    }
    catch (error) {
        payload?.payload?.errorfunction("User Deleted Successfully ")
        console.log(error, "error in adding user")
    }
}
function* addUser(payload) {
    try {

        const res = yield axios.post(
            URL + route.POST, payload?.payload?.data, option
        );
        if (res.status === 200) {
            yield put(getUsersData({}))
            payload?.payload?.success("User created Successfully ")
        }
    } catch (error) {
        payload?.payload?.errorfunction("User Deleted Successfully ")
        console.log(error, "error in adding user")
    }
}


function* logout(payload) {

    try {

        const res = yield axios.delete(URL + route.LOGOUT, option)
        console.log(res)
        payload?.payload?.sucessfullLogout(" Logout Successfull")
        socket.emit('logout')
    }
    catch (error) {
        console.log(error, "error in getting User")
    }
}
function* getUserById({ payload }) {

    try {
        const res = yield axios.get(URL + route.FIND + payload?.id, option)
        console.log(res)
        yield put(setUser(res?.data))
    }
    catch (error) {
        console.log(error)
    }
}
function* getUser(payload) {
    try {
        const res = yield axios.get(
            URL + route.GET, option
        );


        console.log(res?.data, "user data")
        yield put(setUserData(res?.data));
    } catch (error) {
        console.log(error, "error in getting User")
    }
}

function* searchUserBySearchString({ payload }) {
    try {
        const res = yield axios.get(URL + route.SEARCH + "?char=" + payload?.value +"&id="+ payload?.id, option)
        console.log(res)
        yield put(getSearchedUser(res?.data))
    }
    catch (error) {
        console.log(error)
    }
}

function* createRoom({ payload }) {
    console.log(payload)
    try {
        socket.emit("joinroom", payload)
        socket.on('createRoomResponse', (response) => {
            console.log('createRoomResponse:', response);
            payload.dataToBeSent.successfulChatRoomResponse(response)
        });

    } catch (error) {
        console.log(error)
    }
}

function* messageSent(payload)
{
    console.log(payload)
    try{
         socket.emit("sendMessage",payload.payload)
    }catch(error)
    {
        console.log(error)

    }
}

function* getAllMessages({payload})
{
    const { id, page, pageSize } = payload;
    socket.emit('gettingAllMessages', { id, page, pageSize });
    socket.on('setAllMessages', (response) => {
        payload?.AllMessage(response)
    });
}

function* Saga() {
    yield all([
        takeLatest(ActionStates.GET_ALL_USERS_DATA, getUser),
        takeLatest(ActionStates.ADD_NEW_USER, addUser),
        takeLatest(ActionStates.DELETE_USER, deleteUser),
        takeLatest(ActionStates.UPDATE_USER, updateUser),
        takeLatest(ActionStates.LOGIN, login),
        takeLatest(ActionStates.GET_USER, getUserById),
        takeLatest(ActionStates.LOGOUT, logout),
        takeLatest(ActionStates.SEARCH_USER, searchUserBySearchString),
        takeLatest(ActionStates.CREATE_CHAT_ROOM, createRoom),
        takeLatest(ActionStates.SEND_MESSAGE, messageSent),
        takeLatest(ActionStates.GET_ALL_MESSAGE , getAllMessages),
        takeLatest(ActionStates.GET_ALL_PRODUCTS , loadProducts),
    ])
}

export default Saga;