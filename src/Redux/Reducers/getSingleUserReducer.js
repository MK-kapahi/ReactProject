import { ActionStates } from "../Actions/ActionState"



const initialStateForUserRegister = {};

export const GET_SINGLE_USER_REDUCER = (state = initialStateForUserRegister, action) => {
    switch (action?.type) {
        case ActionStates.SET_USER:
            return {
                ...state, ...action
            }

        default:
            return state
    }

         
}