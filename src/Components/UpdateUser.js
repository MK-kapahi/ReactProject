import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL, route } from "../Shared/Constant";
const initialFormFields = {
    name: '',
    email: '',
    password: '',
    contact: '',
    age: '',
}


const formErrorsInitialState = {
    name: "",
    email: "",
    password: "",
    contact: "",
    age: "",
    err: "",
};

export default function UpdateUser() {

    const [formFields, setFormFields] = useState(initialFormFields)
    const [uploadpic, setUploadpic] = useState(null)
    const [formFieldsError, setFormFieldsErrors] = useState(formErrorsInitialState)


    const { id } = useParams()
    useEffect(() => {
        axios.get(URL + route.FIND + id).then((res) => {
            console.log(res.data)
            setFormFields({
                name: res.data.name,
                email: res.data.email,
                password: res.data.password,
                contact: res.data.contact,
                age: res.data.age,
            })

        }).catch((err) => {
            console.log(err)
        })
    }, []);

    const handleSubmit = () => {

    }

    const handelImageChange = (e) => {



    }

    const handelInput = (field, value) => {
        console.log(field + " gjhvhjgvhghg " + value)

        switch (field) {
            case "name":
                setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                break;

            case "email":

                setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                break;

            case "password":
                setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                break;

            case "age":
                setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
                break;

            case "contact":
                setFormFields((prevFields) => ({ ...prevFields, [field]: value }));

                break;

            default:
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
                            <input type="text" className="form-control-plaintext" id="staticEmail" value={formFields.name} placeholder="abc..." onChange={(e) => handelInput("name", e.target.value)} />
                            {formFieldsError.name ? <label name="text-danger">{formFieldsError.name}</label> : null}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control-plaintext" id="staticEmail1" placeholder="email@example.com" onChange={(e) => handelInput("email", e.target.value)} />
                            {formFieldsError.name ? <label className="text-danger">{formFieldsError.name}</label> : null}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" onChange={(e) => handelInput("password", e.target.value)} ></input>
                            {formFieldsError.name ? <label className="text-danger">{formFieldsError.name}</label> : null}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail2" className="col-sm-2 col-form-label">Contact</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" id="staticEmail2" placeholder="91......" onChange={(e) => handelInput("contact", e.target.value)} ></input>
                            {formFieldsError.name ? <label className="text-danger">{formFieldsError.name}</label> : null}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail3" className="col-sm-2 col-form-label">Age</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control-plaintext" id="staticEmail3" placeholder="18" onChange={(e) => handelInput("password", e.target.value)} ></input>
                            {formFieldsError.name ? <label className="text-danger">{formFieldsError.name}</label> : null}
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="staticEmail5" className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control-plaintext" id="staticEmail5" onChange={handelImageChange}></input>
                        </div>
                    </div>

                    <div className="mb-3 row button" >
                        <button className="btn btn-primary col-sm-4 btn-submit" onClick={handleSubmit}> Submit  </button>
                    </div>
                </form>
            </div>

        </section>
    )
}