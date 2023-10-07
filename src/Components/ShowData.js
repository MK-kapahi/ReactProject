import React, { useState } from "react";

export default function ShowData( {data}) {

    const HeadingArray = {
        NAME: {
            title: "Name",
            value: "name"
        },
        EMAIL: {
            title: "Email",
            value: "email"
        },
        PASSWORD: {
            title: "Password",
            value: "password"
        },
        CONTACT: {
            title: "Contact",
            value: "contact"
        },
        AGE: {
            title: "Age",
            value: "age"
        },
    };
    return (
        <div className="d-flex justify-content-center w-100">
            <table className="table  table-warning ">
                <thead className='table table-success'>
                    <tr>
                        <th className='p-3'>#</th>
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
                        console.log(val.name,"fsdgfdsgfdgsj")
                        return (
                            <tr key={val.id}>
                                <td>
                                    {/* <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={inputData.includes(val.id)}
                                        onChange={handleCheckboxChange}
                                    /> */}
                                </td>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>{val.password}</td>
                                <td>{val.age}</td>
                                <td>{val.conatct}</td>
                            </tr>
                        );
                    })}


                </tbody>
            </table>
        </div>
    )
}