import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailForm from "./DetailForm";
import ShowData from "./ShowData";
import axios from "axios";
import { URL } from "../Shared/Constant";
import { route } from "../Shared/Constant";

export default function () {

    const [dataList, setDataList] = useState([]);

    function post(data) {
        axios.post(URL + route.POST, data).then((res) => {
            console.log(res);
            get()

        }).catch((err) => {
            console.log(err);
        })
    }

    const get = () => {
        axios.get(URL+route.GET).then((res) => {

            //    console.log(URL+route.POST)
            console.log(res);
            setDataList([...res.data])
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    const deleteUser = (id) => {
        axios.delete(URL + route.DELETE + "/" + id).then((res) => {
            get()
        })
    }

    useEffect(() => {
        get();
    }, []);
    return (
        <>
            <DetailForm data={dataList} setData={setDataList} postData={post} />

            < ShowData data={dataList} setData={setDataList} deleteUser={deleteUser} />
        </>
    )
}