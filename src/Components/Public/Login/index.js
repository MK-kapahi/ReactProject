import React, { useState } from "react";
import './style.css'
import { ERROR_MESSAGES, REGEX, URL, route } from "../../../Shared/Constant";
import axios from "axios";
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
    const invalidCharacterForEmail = "!#$%^&*()_-+=~`,<>/?;:'{}[]\\|\"\"";
    const arrOfInvalidChForEmail = invalidCharacterForEmail.split("");

    const { fields, setFields } = useState(initialFeilds);
    const { errorFields, setErrorFeilds } = useState(errorInitialFeilds);

    const handelInputChange = (field, value, MINLENGTH, errMsg, err, setErrorState) => {

        switch (field) {
            case 'email':
                if (value.length < MINLENGTH) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                } else if (value.split("").some((val) => arrOfInvalidChForEmail.some((item) => item === val))) {
                    setErrorState({ [field]: ERROR_MESSAGES.CANT_ENTER_NUMBER });
                } else {
                    setErrorState(initialFeilds);
                    setFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            case 'password':
                if (value.length < MINLENGTH) {
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
            setErrorFeilds({ err: ERROR_MESSAGES.ENTER_ALL_FIELDS });
            return;
        }


        if (!isEmailValid) {
            setErrorFeilds({ "email": ERROR_MESSAGES.ENTER_VALID_EMAIL });
            return;
        }

        if (!isPasswordValid) {
            setErrorFeilds({ "password": ERROR_MESSAGES.ENTER_VALID_PASSWORD })
            return;
        }


        const data = [
            {
                email: email,
                password: password
            }]


        axios.post(URL + route.LOGIN).then((res) => {
            console.log(res);
        })


    }
    return (
        <section className="container">
            <form className="form">

                <div className="form-outline mb-4 formInput">
                    <label className="form-label" htmlFor="form2Example1">Email address</label>
                    <input type="email" id="form2Example1" className="form-control" onChange={(e) => handelInputChange("email", e.target.value, 10, ERROR_MESSAGES, errorFields, setErrorFeilds)} />
                </div>


                <div className="form-outline mb-4 formInput">
                    <label className="form-label" htmlFor="form2Example2"  >Password</label>
                    <input type="password" id="form2Example2" className="form-control" onChange={(e) => handelInputChange("password", e.target.value, 8, ERROR_MESSAGES, errorFields, setErrorFeilds)} />
                </div>


                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handelSubmit} >Sign in</button>


            </form>
        </section>
    )
}