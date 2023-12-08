import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './style.css'
import { useDispatch } from "react-redux";
import { success } from "../../Shared/Context";
import { logout } from "../../Redux/Actions";

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutUser = () => {
        dispatch(logout({ sucessfullLogout }))
    }

    const sucessfullLogout = (message) => {
        navigate('/login')
        success(message);

    }
  
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home" activeclassname="active" >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/applyFilter" activeclassname="active">
                                    View Users
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/chat" activeclassname="active">
                                  Chat 
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products" activeclassname="active">
                                  Show Products 
                                </NavLink>
                            </li>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-success" type="button" onClick={logoutUser}>Logout</button>
                    </form>
                </div>
            </div>
        </nav >

        </>
    )
}