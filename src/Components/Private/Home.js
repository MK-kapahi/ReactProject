import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailForm from "./DetailForm";
import ShowData from "./ShowData";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { addnewUser, getUsersData, deleteOneUser, logout } from "../../Redux/Actions";
import { success, errorFunction } from "../../Shared/Context";



export default function Home() {
    const dispatch = useDispatch();
    const [dataList, setDataList] = useState([]);
    const data = useSelector(state => state?.registerReducer?.payload)

    const userData = data || []
    function post(data) {
        dispatch(addnewUser({ data, success, errorFunction }))

    }

    const get = () => {
        dispatch(getUsersData({}))
    }


    const deleteUser = (id) => {
        dispatch(deleteOneUser({ id, success, errorFunction }))
    }


    useEffect(() => {
        get();
    }, []);
    return (
        <>

            <section className="container">

                <DetailForm data={dataList} setData={setDataList} postData={post} />


                < ShowData dataList={userData} deleteUser={deleteUser} />

            </section>
        </>
    )
}