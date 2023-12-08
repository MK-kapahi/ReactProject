import { createContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const dataContext = createContext("")
// const 

export const success = (message) =>{
    toast.success( message, {
                 position: toast.POSITION.TOP_RIGHT,
             })
}


export const errorFunction = (message) =>{
    toast.errorFunction( message, {
                 position: toast.POSITION.TOP_RIGHT,
             })
}

export const warning = (message) =>{
    toast.warning( message, {
                 position: toast.POSITION.TOP_RIGHT,
             })
}

export const setResponse = (data) =>{
    const res = data;

    return data;
         
}


export const getResponse = (data) =>{
    const res = data;

    return data;
         
}