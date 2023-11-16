import { ActionStates } from "../Actions/ActionState"



const initialStateForRegister = {
   
}
export const GET_USER_REDUCER = (state = initialStateForRegister, action) => {
    switch (action?.type) {
        case ActionStates.GET_ALL_USERS_DATA:
            return {
                ...state, ...action?.payload
            }

        default:
            return state
    }
}