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
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import { getUsers } from "../../Redux/Actions";



export default function () {
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [dataList, setDataList] = useState([]);
    let token = cookies.get('token');
    // const token = localStorage.getItem('token')

    function post(data) {
        axios.post(URL + route.POST, data, {
            withCredentials: 'include',
        }).then((res) => {
            toast.success("User Added Sucessfully", {
                position: toast.POSITION.TOP_RIGHT,
            })

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

        // dispatch(getUsers({}))
        axios.get(URL + route.GET, {

            withCredentials: 'include',
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

            withCredentials: 'include',
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
            withCredentials: 'include',
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

    const showUser = () => {
        navigate('/home/applyFilter')
    }

    useEffect(() => {



        if (token) {
            navigate('/home')
        }

        else {
            navigate('/login')
        }

        get();
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
                                <button type="button" className="btn btn-primary me-3" onClick={showUser}>
                                    Apply Filter
                                </button>
                                <button type="button" className="btn btn-primary me-3" onClick={logoutUser}>
                                    logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <DetailForm data={dataList} setData={setDataList} postData={post} />


                <dataContext.Provider value={[dataList, deleteUser]}>
                    < ShowData />
                </dataContext.Provider>
            </section>
        </>
    )
}