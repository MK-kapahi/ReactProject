import React, { useState } from "react";
import { isValidConact, isValidEmail, isValidUsername } from "../../shared/Utils";
import ShowUsers from "../Showusers";

export default function Addusers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [contacterror, setContactError] = useState("");
  const [contact, setContact] = useState("");
  const [nameerror, setNameError] = useState("");
  const [list, setList] = useState([]);
  const handelInputName = (e) => {
    setNameError("")
    setName(e.target.value);
  };

  const handelInputEmail = (e) => {
      setEmailError("")
      setEmail(e.target.value);
  };

  const handelInputContact = (e) => {
      setContactError("")
    setContact(e.target.value);
  };

  const validateForm = () => {
    if (name.length == 0 && email.length == 0 && contact.length == 0) { 
      setNameError("required");
      setEmailError("required");
      setContactError("required");
    return true;
    }

    else if(name.length == 0 || email.length == 0 || contact.length == 0)
    {
       if( !isValidUsername.test(name) || name.length ===0)
        {
            setNameError("Enter valid name")
        }
         if( !isValidEmail.test(email))
        {
            setEmailError("Enter valid Email")
            
        }
         if(!isValidConact.test(contact))
        {
            setContactError("Enter valid contact")
           
        }
        return true;
    }
     else {
         setNameError("");
         setContactError("");
         setEmailError("")
      return false;
    }
  };

  const handelSubmit = (e) => {
    let validate = validateForm();
    e.preventDefault();
    if (!validate) {
        let Input = {'name' : name , 'email' : email , 'contact' :contact }
      console.log({'name' : name , 'email' : email , 'contact' :contact });
      const user =[...list]
      user.push(Input)
      // @ts-ignore
      setList(user)
      setName("")
      setEmail("")
      setContact("")
    }
  };

  const deleteUser = (index) =>
  {
      let f=[...list]
      f.splice(index,1)
      // @ts-ignore
      setList(f)
  }
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Username
          </label>
          <input type="text" onChange={handelInputName}  name="name"  value={name}  placeholder="Enter your name"  className="form-control"  id="exampleInputName" ></input>
          <p style={{ color: "Red" }}>{nameerror }</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handelInputEmail} value={email}></input>
          <p style={{ color: "Red" }}>{emailerror }</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            contact
          </label>
          <input type="text" className="form-control" id="exampleInputPassword1" onChange={handelInputContact} value={contact}></input>
          <p style={{ color: "Red" }}>{contacterror }</p>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div>
        <ShowUsers list={list} deleteUser={deleteUser} ></ShowUsers>
      </div>
    </div>
  );
}
