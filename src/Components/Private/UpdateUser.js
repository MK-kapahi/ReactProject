import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ERROR_MESSAGES, URL, route, REGEX, IMAGEURL } from "../../Shared/Constant";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialFormFields = {
    name: '',
    email: '',
    contact: '',
    age: '',
    imagePath: '',
}


const formErrorsInitialState = {
    name: "",
    email: "",
    contact: "",
    age: "",
    err: "",
};

export default function UpdateUser() {


    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(initialFormFields)
    const [uploadpic, setUploadpic] = useState(null)
    const [formFieldsError, setFormFieldsErrors] = useState(formErrorsInitialState)
    const invalidCharacterForEmail = "!#$%^&*()_-+=~`,<>/?;:'{}[]\\|\"\"";
    const arrOfInvalidChForEmail = invalidCharacterForEmail.split("");


    const { id } = useParams()
    const tokenStored = localStorage.getItem("token")
    useEffect(() => {
        axios.get(URL + route.FIND + id, {
            withCredentials : 'include',
        }).then((res) => {
            console.log(res.data)
            setFormFields({
                name: res.data.name,
                email: res.data.email,
                contact: res.data.contact,
                age: res.data.age,
                imagePath: res.data.imagePath
            })

        }).catch((err) => {
            console.log(err)
            toast.warning(err.response.statusText)
            navigate('/home')

        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            email,
            password,
            contact,
            age,
        } = formFields;

        //Validation checks
        const isNameValid = name.trim().length >= 3;
        const isEmailValid = REGEX.EMAIL.test(email);
        const isAllFieldsFilled =
            name.trim() === "" &&
            email.trim() === "" &&
            age.trim() === "" &&
            contact.trim() === ""

        if (isAllFieldsFilled) {
            setFormFieldsErrors({ err: ERROR_MESSAGES.ENTER_ALL_FIELDS });
            return;
        }

        if (!isNameValid) {
            setFormFieldsErrors({
                name: ERROR_MESSAGES.ENTER_VALID_LENGTH,
            });
            return;
        }

        if (!isEmailValid) {
            setFormFieldsErrors({ "email": ERROR_MESSAGES.ENTER_VALID_EMAIL });
            return;
        }

        // All validations passed, proceed with saving data

        console.log(name)

        const formData = new FormData();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("contact", contact)
        formData.append("age", age)
        console.log(uploadpic)
        if (uploadpic) {
            console.log("if the pic is uploaded")
            formData.append('file', uploadpic)
        }
        const data = {
            name: name,
            email: email,
            password: password,
            contact: contact,
            age: age,
            imagePath: formData
        }
        console.log(data)

        axios.put(URL + route.UPDATE + "/" + id, formData, {
            withCredentials : 'include',   
        }).then((res) => {
            console.log(res)

            toast.success("User Updated Sucessfully", {
                position: toast.POSITION.TOP_RIGHT,
            })
            navigate('/home')

        }).catch((err) => {
            console.log(err)
        })
    }

    const handelImageChange = (e) => {


        const file = e.target.files[0];

        if (file) {
            setUploadpic(file)
        }

    }

    const handelInput = (field, value, minLength, errMsg, err, setErrorState) => {
        switch (field) {
            case "name":
                if (value.length > minLength) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(minLength) }));
                } else {
                    setErrorState(formErrorsInitialState);
                    setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            case "email":
                if (value.length > minLength) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(minLength) }));
                } else if (value.split("").some((val) => arrOfInvalidChForEmail.some((item) => item === val))) {
                    setErrorState({ [field]: ERROR_MESSAGES.CANT_ENTER_NUMBER });
                } else {
                    setErrorState(formErrorsInitialState);
                    setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            case "password":

                setErrorState(formErrorsInitialState);
                setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                break;

            case "age":
                if (value.length > minLength) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(minLength) }));
                } else if (value.includes(".") || value.includes("  ") || isNaN(value)) {
                    setErrorState({ [field]: ERROR_MESSAGES.ENTER_AGE_IN_RANGE });
                } else {
                    setErrorState(formErrorsInitialState);
                    setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            case "contact":
                if (value.length > minLength) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(minLength) }));
                } else if (isNaN(value)) {
                    setErrorState({ [field]: ERROR_MESSAGES.ENTER_VALID_CONTACT_NUMBER });
                } else {
                    setErrorState(formErrorsInitialState);
                    setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            default:
                setErrorState(formErrorsInitialState);
                setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                break;
        }


    }

    return (




        <section>

            <div className="container">
                <form encType='multipart/form-data' >

                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label" >Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" id="staticEmail" value={formFields.name} placeholder="abc..." onChange={(e) => handelInput("name", e.target.value, 30, ERROR_MESSAGES, formFieldsError, setFormFieldsErrors)} />
                            {formFieldsError.name ? <label name="text-danger">{formFieldsError.name}</label> : null}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control-plaintext" id="staticEmail1" value={formFields.email} placeholder="email@example.com" onChange={(e) => handelInput("email", e.target.value, 30, ERROR_MESSAGES, formFieldsError, setFormFieldsErrors)} />
                            {formFieldsError.name ? <label className="text-danger">{formFieldsError.name}</label> : null}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail2" className="col-sm-2 col-form-label">Contact</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" id="staticEmail2" value={formFields.contact} placeholder="91......" onChange={(e) => handelInput("contact", e.target.value, 10, ERROR_MESSAGES, formFieldsError, setFormFieldsErrors)} ></input>
                            {formFieldsError.name ? <label className="text-danger">{formFieldsError.name}</label> : null}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail3" className="col-sm-2 col-form-label">Age</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control-plaintext" id="staticEmail3" placeholder="18" value={formFields.age} onChange={(e) => handelInput("age", e.target.value, 8, ERROR_MESSAGES, formFieldsError, setFormFieldsErrors)} ></input>
                            {formFieldsError.age ? <label className="text-danger">{formFieldsError.age}</label> : null}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-10">
                            <img src={IMAGEURL + formFields.imagePath} alt="Nothing to preview" />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="staticEmail5" className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control-plaintext" id="staticEmail5" onChange={handelImageChange}></input>
                        </div>
                    </div>

                    <div className="mb-3 row button" >
                        <button className="btn btn-primary col-sm-4 btn-submit" onClick={handleSubmit}> Update  </button>
                    </div>
                </form>
            </div>
            {/* <img src={IMAGEURL+ formFields.imagePath} alt="Nothing to preview"> </img> */}
        </section>
    )
}