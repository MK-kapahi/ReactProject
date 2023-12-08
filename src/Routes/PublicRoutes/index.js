import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from '../../Components/Private/Home';
import UpdateUser from '../../Components/Private/UpdateUser';
import Login from '../../Components/Public/Login';
import 'react-toastify/dist/ReactToastify.css';
import FilterPage from '../../Components/Private/FilterPage';
import Cookies from 'universal-cookie';
import Navbar from "../../Shared/Navbar";
import Footer from "../../Shared/Footer";
import ChatRoom from "../../Components/Private/ChatRoom"
import socket from "../../Service/socket";
import { Product } from "../../Components/Private/Products";
import { PaymentPage } from "../../Components/Private/Products/Components/PaymentPage";

export default function PublicRoutes() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    let token = cookies.get('token');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (token) {
            navigate('/home')
            setIsAuthenticated(true);
        }

        else {
            setIsAuthenticated(false);
            navigate('/login')
            socket.emit('logout')
        }
    }, [token]);
    return (
        <>
        

        {isAuthenticated && <Navbar />}
        <Routes>
            <Route
                path="/"
                element={<Login />}
            />
            <Route exact path='/login' element={<Login />}></Route>

            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/applyFilter' element={<FilterPage />} > </Route>
            <Route exact path='/chat' element={< ChatRoom />} > </Route>
            <Route exact path='/update/:id' element={<UpdateUser />}></Route>
            <Route exact path='/products' element={<Product />}></Route>
            <Route exact path='/buyProduct' element={<PaymentPage />}></Route>
        </Routes>
        {isAuthenticated && <Footer />}
                </>

    )
}