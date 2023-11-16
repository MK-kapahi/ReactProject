import { ActionStates } from "./ActionState"

export const getUsers = (payload) =>{
   console.log("heyyyyyyyyyyyyyyyyyyyy",payload)
   return {
     type : ActionStates.GET_ALL_USERS_DATA,
     payload
   }
}