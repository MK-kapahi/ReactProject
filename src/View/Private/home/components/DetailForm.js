import React, { useState } from "react";
import { ERROR_MESSAGES, REGEX } from "../../../../Shared/Constant";

const initialFormFields = {
  name: "",
  email: "",
  password: "",
  contact: "",
  age: "",
};

const formErrorsInitialState = {
  name: "",
  email: "",
  password: "",
  contact: "",
  age: "",
  err: "",
};

export default function DetailForm({ data, setData = () => {}, postData }) {
  const invalidCharacterForEmail = '!#$%^&*()_-+=~`,<>/?;:\'{}[]\\|""';
  const arrOfInvalidChForEmail = invalidCharacterForEmail.split("");

  const [formFields, setFormFields] = useState(initialFormFields);
  const [uploadpic, setUploadpic] = useState(null);
  const [formFieldsError, setFormFieldsErrors] = useState(
    formErrorsInitialState
  );

  const validateInput = (
    field,
    value,
    maxLength,
    errMsg,
    formFieldsError,
    setErrorState
  ) => {
    switch (field) {
      case "name":
        if (value.length > maxLength) {
          setErrorState((prevState) => ({
            ...prevState,
            [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(maxLength),
          }));
        } else {
          setErrorState(formErrorsInitialState);
          setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
        }
        break;

      case "email":
        if (value.length > maxLength) {
          setErrorState((prevState) => ({
            ...prevState,
            [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(maxLength),
          }));
        } else if (
          value
            .split("")
            .some((val) => arrOfInvalidChForEmail.some((item) => item === val))
        ) {
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
        if (value.length > maxLength) {
          setErrorState((prevState) => ({
            ...prevState,
            [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(maxLength),
          }));
        } else if (
          value.includes(".") ||
          value.includes("  ") ||
          isNaN(value)
        ) {
          setErrorState({ [field]: ERROR_MESSAGES.ENTER_AGE_IN_RANGE });
        } else {
          setErrorState(formErrorsInitialState);
          setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
        }
        break;

      case "contact":
        if (value.length > maxLength) {
          setErrorState((prevState) => ({
            ...prevState,
            [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(maxLength),
          }));
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
  };

  const handelImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadpic(file);
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormFields(initialFormFields);
    setFormFieldsErrors(formErrorsInitialState);
    setUploadpic(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, contact, age } = formFields;

    //Validation checks
    const isNameValid = name.trim().length >= 3;
    const isEmailValid = REGEX.EMAIL.test(email);
    const isPasswordValid = REGEX.PASSWORD.test(password);
    const isAllFieldsFilled =
      name.trim() === "" &&
      email.trim() === "" &&
      password.trim() === "" &&
      age.trim() === "" &&
      contact.trim() === "";

    console.log(isAllFieldsFilled, password, "isjdgfd");

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
      setFormFieldsErrors({ email: ERROR_MESSAGES.ENTER_VALID_EMAIL });
      return;
    }

    if (!isPasswordValid) {
      setFormFieldsErrors({ password: ERROR_MESSAGES.ENTER_VALID_PASSWORD });
      return;
    }
    // All validations passed, proceed with saving data
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("contact", contact);
    formData.append("age", age);
    formData.append("file", uploadpic);
    console.log(formData);
    console.log("uploadpicuploadpicuploadpic", {name,email,password,contact,age,uploadpic});

    postData(formData);
    resetForm();
  };

  return (
    <section>
      <div className="container">
        <form encType="multipart/form-data">
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control-plaintext"
                id="staticEmail"
                value={formFields.name}
                placeholder="abc..."
                onChange={(e) =>
                  validateInput(
                    "name",
                    e.target.value,
                    15,
                    ERROR_MESSAGES,
                    formFieldsError,
                    setFormFieldsErrors
                  )
                }
              />
            </div>
            {formFieldsError.name ? (
              <label name="text-danger">{formFieldsError.name}</label>
            ) : null}
          </div>
          <div className="mb-3 row">
            <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control-plaintext"
                id="staticEmail1"
                value={formFields.email}
                placeholder="email@example.com"
                onChange={(e) =>
                  validateInput(
                    "email",
                    e.target.value,
                    30,
                    ERROR_MESSAGES,
                    formFieldsError,
                    setFormFieldsErrors
                  )
                }
              />
            </div>
            {formFieldsError.email ? (
              <label className="text-danger">{formFieldsError.email}</label>
            ) : null}
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={formFields.password}
                onChange={(e) =>
                  validateInput(
                    "password",
                    e.target.value,
                    8,
                    ERROR_MESSAGES,
                    formFieldsError,
                    setFormFieldsErrors
                  )
                }
              ></input>
              {formFieldsError.password ? (
                <label Name="text-danger">{formFieldsError.password}</label>
              ) : null}
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="staticEmail2" className="col-sm-2 col-form-label">
              Contact
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control-plaintext"
                id="staticEmail2"
                value={formFields.contact}
                placeholder="91......"
                onChange={(e) =>
                  validateInput(
                    "contact",
                    e.target.value,
                    10,
                    ERROR_MESSAGES,
                    formFieldsError,
                    setFormFieldsErrors
                  )
                }
              ></input>
            </div>
            {formFieldsError.contact ? (
              <label className="text-danger">{formFieldsError.contact}</label>
            ) : null}
          </div>
          <div className="mb-3 row">
            <label htmlFor="staticEmail3" className="col-sm-2 col-form-label">
              Age
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control-plaintext"
                id="staticEmail3"
                value={formFields.age}
                placeholder="18"
                onChange={(e) =>
                  validateInput(
                    "age",
                    e.target.value,
                    2,
                    ERROR_MESSAGES,
                    formFieldsError,
                    setFormFieldsErrors
                  )
                }
              ></input>
            </div>
            {formFieldsError.age ? (
              <label className="text-danger">{formFieldsError.age}</label>
            ) : null}
          </div>

          <div className="mb-3 row">
            <label htmlFor="staticEmail5" className="col-sm-2 col-form-label">
              Image
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control-plaintext"
                id="staticEmail5"
                value={formFields.imagePath}
                placeholder="18"
                onChange={handelImageChange}
              ></input>
            </div>
            {formFieldsError.imagePath ? (
              <label className="text-danger">{formFieldsError.imagePath}</label>
            ) : null}
          </div>
          <div className="d-flex justify-content-center">
            {formFieldsError.err ? (
              <h5 className="text-danger">{formFieldsError.err}</h5>
            ) : null}
          </div>

          <div className="mb-3 row button">
            <button
              className="btn btn-primary col-sm-4 btn-submit"
              onClick={handleSubmit}
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
