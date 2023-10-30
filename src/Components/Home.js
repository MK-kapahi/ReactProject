import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailForm from "./DetailForm";
import ShowData from "./ShowData";
import axios from "axios";
import { URL } from "../Shared/Constant";
import { route } from "../Shared/Constant";

export default function () {

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        axios.get(URL).then((res) => {

        //    console.log(URL+route.POST)
            console.log(res);
            setDataList([...res.data])
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }, []);
    return (
        <>
            <DetailForm data={dataList} setData={setDataList} />

            < ShowData data={dataList} setData={setDataList} />
        </>
    )
}