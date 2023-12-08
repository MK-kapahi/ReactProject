import { ActionStates } from "../Actions/ActionState"



const initialUser = {
}
export const SET_SEARCHE_REDUCER = (state = initialUser, action) => {
    switch (action?.type) {

        case ActionStates.SEARCHED_USER_DATA:
            return {
                ...state, ...action
        }
        default:
            return state
    }


}