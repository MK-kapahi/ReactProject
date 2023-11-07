import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailForm from "./DetailForm";
import ShowData from "./ShowData";
import axios from "axios";
import { URL } from "../../Shared/Constant";
import { route } from "../../Shared/Constant";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataContext } from "../../Shared/Context";


export default function () {

    const navigate = useNavigate();

    const [dataList, setDataList] = useState([]);
    const token = localStorage.getItem('token')

    function post(data) {
        axios.post(URL + route.POST, data, {
            headers: {
                authorization: token
            }
        }).then((res) => {
            console.log(res);

            if (res.data.role == 1) {
                localStorage.clear()
                navigate('/login');
            }
            get();

        }).catch((err) => {
            console.log(err);
            toast.warning(err.response.data)
        })
    }

    const get = () => {
        axios.get(URL + route.GET, {
            headers: {
                authorization: token
            }
        }).then((res) => {
            console.log(res);
            if (res.data.message === 'jwt expired') {
                localStorage.clear()
                navigate('/login');
                toast.warning("Session Expired Please login", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            }

            else {
                setDataList([...res.data])

            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const deleteUser = (id) => {
        axios.delete(URL + route.DELETE + "/" + id, {

            headers: {
                authorization: token
            }
        }).then((res) => {
            console.log(res);
            toast.success("User Deleted Sucessfully ", {
                position: toast.POSITION.TOP_RIGHT,
            })
            get()
        }).catch((err) => {
            toast.warning(err.response.statusText)
            console.log(err)
        })
    }

    const logoutUser = () => {
        axios.delete(URL + route.LOGOUT, {
            headers: {
                authorization: token
            }
        }).then((res) => {
            console.log(res)
            toast.success("Logout Sucessfull", {
                position: toast.POSITION.TOP_RIGHT,
            })
            localStorage.clear()
            navigate('/login')
        }).catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        if (token) {
            navigate('/home')
        }

        else {
            navigate('/login')
        }

        // get();
    }, []);
    return (
        <>

            <section className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarButtonsExample"
                            aria-controls="navbarButtonsExample"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars"></i>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarButtonsExample">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Navbar</a>
                                </li>
                            </ul>

                            <div className="d-flex align-items-center">
                                <button type="button" className="btn btn-primary me-3" onClick={logoutUser}>
                                    logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <DetailForm data={dataList} setData={setDataList} postData={post} />


                <dataContext.Provider value={[ dataList, deleteUser ]}>
                    < ShowData />
                </dataContext.Provider>
            </section>
        </>
    )
}