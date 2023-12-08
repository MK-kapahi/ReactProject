import React, { useState, useEffect } from "react";
import './style.css'
import { ERROR_MESSAGES, REGEX, URL, route } from "../../../Shared/Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { LoginUser } from "../../../Redux/Actions";
import { success } from "../../../Shared/Context";
const initialFeilds = {
    email: "",
    password: "",
}

const errorInitialFeilds =
{
    emailError: "",
    passwordError: "",
    error: ""
}
export default function Login() {
    useEffect(() => {

        axios.get(URL + route.DATA).then((res) => {
            if (res.data.length == 0) {
                document.cookie = `token=hello;max-age=604800;domain=example.com`
            }
        })
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const invalidCharacterForEmail = "!#$%^&*()_-+=~`,<>/?;:'{}[]\\|\"\"";
    const arrOfInvalidChForEmail = invalidCharacterForEmail.split("");

    const [fields, setFields] = useState(initialFeilds);
    const [errorFields, setErrorFields] = useState(errorInitialFeilds);

    const handelInputChange = (field, value, MINLENGTH, errMsg, err, setErrorState) => {
        switch (field) {
            case 'email':
                if (value.length > MINLENGTH) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                } else if (value.split("").some((val) => arrOfInvalidChForEmail.some((item) => item === val))) {
                    setErrorState({ [field]: ERROR_MESSAGES.CANT_ENTER_NUMBER });
                } else {
                    setErrorState(initialFeilds);
                    setFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            case 'password':
                if (value.length > MINLENGTH) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                }
                else {

                    setErrorState(initialFeilds);
                    setFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            default:
                setErrorState();
                setFields((prevFields) => ({ ...prevFields, [field]: value }));
                break;
        }

    }


    const handelSubmit = (e) => {

        e.preventDefault();
        const {
            email,
            password
        } = fields;

        const isEmailValid = REGEX.EMAIL.test(email);
        const isPasswordValid = REGEX.PASSWORD.test(password);
        const isAllFieldsFilled =
            email.trim() === "" &&
            password.trim() === "";

        if (isAllFieldsFilled) {
            setErrorFields({ err: ERROR_MESSAGES.ENTER_ALL_FIELDS });
            return;
        }


        if (!isEmailValid) {
            setErrorFields({ "email": ERROR_MESSAGES.ENTER_VALID_EMAIL });
            return;
        }

        if (!isPasswordValid) {
            setErrorFields({ "password": ERROR_MESSAGES.ENTER_VALID_PASSWORD })
            return;
        }


        const data =
        {
            email: email,
            password: password
        }

        dispatch(LoginUser({ data , successfullLogin }))
    }

    const successfullLogin = (msg) =>{
        navigate('/home')

        success(msg)
        
        }
    return (
        <section className="container">
            <form className="form">

                <div className="form-outline mb-4 formInput">
                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                    <input type="email" id="form2Example1" className="form-control" onChange={(e) => handelInputChange("email", e.target.value, 40, ERROR_MESSAGES, errorFields, setErrorFields)} />
                    {errorFields.email ? <label className="text-danger">{errorFields.email}</label> : null}
                </div>


                <div className="form-outline mb-4 formInput">
                    <label className="form-label" htmlFor="form2Example2"  >Password</label>
                    <input type="password" id="form2Example2" className="form-control" onChange={(e) => handelInputChange("password", e.target.value, 8, ERROR_MESSAGES, errorFields, setErrorFields)} />
                    {errorFields.password ? <label className="text-danger">{errorFields.password}</label> : null}
                </div>


                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handelSubmit} >Sign in</button>


            </form>
        </section>
    )
}