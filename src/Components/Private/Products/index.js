import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../Redux/Actions";
import './style.css'
import { useNavigate } from "react-router-dom";

export function Product() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productsData = useSelector(state => state?.productsReducer?.payload?.products)
    console.log(productsData)

    const data = productsData || []
    useEffect(() => {

        dispatch(getAllProducts({}))
    }, [])

    const buyTheProduct = (price) => {
     console.log(price)
     navigate("/buyProduct", { priceOfItem: price })
    }
    return (
        <>
            <section className="container">
                <div className="row">
                    <div className="col d-flex justify-content-between flex-wrap">

                        {data.map((singleProduct) => {
                            return (
                                <>
                                    <div class="height d-flex justify-content-center align-items-center productCard">

                                        <div class="card p-3">

                                            <div >
                                                <h5 class="main-heading mt-0">{singleProduct.title}</h5>
                                            </div>
                                            <div className="d-flex productImage">


                                                <img src={singleProduct?.thumbnail} className="img" />

                                            </div>


                                            <div className="d-flex flex-column justify-content-between">

                                                <p>{singleProduct?.description} </p>
                                                <p>Price : {singleProduct?.price} </p>
                                            </div>

                                            <button class="btn btn-danger" onClick={() => buyTheProduct(singleProduct.price)}>Buy Now</button>
                                        </div>

                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}