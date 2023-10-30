import axios from "axios";
import React, { useState } from "react";
import { URL, route } from "../Shared/Constant";

export default function ShowData({ data , setData = () => { } }) {
    const deleteUser = (id) =>{
        console.log(id);

        axios.delete(URL+route.DELETE+"/"+id).then((res)=>{
            console.log(res)

            axios.get(URL).then((res)=>{
                setData([...res.data])
            })
        }).catch((err)=>{
            console.log(err);
        })




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
                                                    <div >
                                                        <button
                                                            className='fa fa-caret-up btn btn-sm'
                                                        // onClick={() => { handleSort(heading, ASC) }}
                                                        ></button>
                                                        <button
                                                            className='fa fa-caret-down btn btn-sm'
                                                        // onClick={() => { handleSort(heading, DEC) }}
                                                        ></button>
                                                    </div>
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
                                                <button onClick={()=> deleteUser(val._id)}>
                                                    Delete
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