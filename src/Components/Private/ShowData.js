
import React, { useContext } from "react";
import { IMAGEURL, } from "../../Shared/Constant";
import { dataContext } from "../../Shared/Context";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function ShowData( {dataList , deleteUser}) {
    const navigate = useNavigate();
    const data = [...dataList]
    const deleteSelectedUser = (id) => {
        deleteUser(id)
    }

    const updateUser = (id) => {
        navigate(`/home/update/${id}`)
    }

    const HeadingArray = {
        NAME: {
            title: "Name",
            value: "name"
        },
        EMAIL: {
            title: "Email",
            value: "email"
        },
        CONTACT: {
            title: "Contact",
            value: "contact"
        },
        AGE: {
            title: "Age",
            value: "age"
        },

        IMAGEPATH:
        {
            title: "Image",
            value: "imagePath"
        },

        ACTION:
        {
            title: "Action"
        }
    };
    return (
        <section>
            <div className="container">

                <div className="row">
                    <div className="col d-flex justify-content-center w-100">
                        <table className="table  table-warning ">
                            <thead className='table table-success'>
                                <tr>
                                    {Object.values(HeadingArray).map((heading) => {
                                        return (
                                            <th >
                                                <div className='d-flex '>
                                                    {heading.title}
                                                </div>
                                            </th>
                                        )
                                    })}

                                </tr>
                            </thead>
                            <tbody>

                                {data.map((val) => {
                                    return (
                                        <tr key={val.id}>
                                            <td>{val.name}</td>
                                            <td>{val.email}</td>
                                            <td>{val.contact}</td>
                                            <td>{val.age}</td>
                                            <td> <div>
                                                <img src={IMAGEURL + val.imagePath} alt="img is loading"></img>
                                            </div></td>
                                            <td> <div>
                                                <button onClick={() => deleteSelectedUser(val._id)}>
                                                    Delete
                                                </button>
                                                <button onClick={() => updateUser(val._id)}>
                                                    Update
                                                </button>
                                            </div> </td>
                                        </tr>
                                    );
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}