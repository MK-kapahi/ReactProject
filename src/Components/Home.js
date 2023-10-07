import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailForm from "./DetailForm";
import ShowData from "./ShowData";

export default function ()
{

    const [dataList, setDataList] = useState([]);
    return (
        <>
        <DetailForm data = {dataList}  setData={setDataList}  />

        < ShowData data={dataList}/>
        </>
    )
}