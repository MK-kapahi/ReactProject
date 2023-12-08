import { ActionStates } from "./ActionState"

export const getUsersData = (payload) => {
  return {
    type: ActionStates.GET_ALL_USERS_DATA,
    payload
  }
}

export const setUserData = (payload) => {
  return {
    type: ActionStates.SET_USER_DATA,
    payload
  }
}

export const addnewUser = (payload) =>{
  return {
    type: ActionStates.ADD_NEW_USER ,
    payload
  }
}

export const updateUser = (payload) =>{
  return {
    type: ActionStates.UPDATE_USER ,
    payload
  }
}

export const deleteOneUser = (payload) =>{
  console.log(payload)
  console.log("from actions",payload)
  return {
    type: ActionStates.DELETE_USER,
    payload
  }
}

export const LoginUser = (payload) =>{
  
  return {
    type: ActionStates.LOGIN,
    payload
  }
}

export const getUser = (payload) =>{
  
  return {
    type: ActionStates.GET_USER,
    payload
  }
}

export const setUser = (payload) => {
  return {
    type: ActionStates.SET_USER,
    payload
  }
}

export const logout = (payload) =>{
  return {
    type: ActionStates.LOGOUT,
    payload
  }
}

export const searchUserBySearchString = (payload) =>{
  return {
    type: ActionStates.SEARCH_USER,
    payload
  }
}

export const setCurrentUser = (payload)=>{
  
  return {
    type: ActionStates.SET_CURRENT_USER,
    payload
  }
}

export const getSearchedUser = (payload) =>{
  console.log(payload)
  return {
    type : ActionStates.SEARCHED_USER_DATA,
    payload
  }
}

export const createChatRoom = (payload) =>{
  console.log(payload)
  return {
    type : ActionStates.CREATE_CHAT_ROOM,
    payload
  }
}

export const sendMessage = (payload) =>
{ 
  return {
    type : ActionStates.SEND_MESSAGE,
    payload
  }
}

export const allMessages = (payload )=>{
  return {
    type : ActionStates.GET_ALL_MESSAGE, 
    payload
  }
}

export const getAllProducts = (payload) =>{
  return {
    type : ActionStates.GET_ALL_PRODUCTS,
    payload
  }
}

export const setAllProdcts = (payload) =>{
  return {
    type : ActionStates.SET_ALL_PRODUCTS , 
    payload
  }
}