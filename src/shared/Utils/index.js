import { REGEX } from "../Constant";

export const isValidEmail = new RegExp(REGEX?.EMAIL)
export const isValidUsername = new RegExp(REGEX.USERNAME)
export const isValidConact = new RegExp('^[6-9]\\d{9}$')