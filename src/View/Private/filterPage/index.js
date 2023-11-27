// libs
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// consts
import { IMAGEURL, URL, route } from "../../../Shared/Constant";

// components
import Pagination from "./Pagination";

// styles
import "./../style.css";

export default function FilterPage() {
  const [data, setData] = useState([]);
  const [maxAge, setMaxAge] = useState(150);
  const [minAge, setMinAge] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [itemPerPage, setItemPerPage] = useState(2);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(itemPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(
        URL +
          route.FILTER +
          "?limit=" +
          limit +
          "&skip=" +
          skip +
          "&char=" +
          `${searchString || ""}` +
          "&minAge=" +
          minAge +
          "&maxAge=" +
          maxAge
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let timeoutId;

    timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [limit, skip, minAge, maxAge, searchString]);

  const selectedValue = (e) => {
    console.log(e.target.value);
    const selectedValue = e.target.value;
    // Split the selected value into two parts
    const [start, end] = selectedValue.split("-");

    // Convert the parts to numbers if needed
    const startNumber = parseInt(start);
    const endNumber = parseInt(end);

    setMaxAge(endNumber);
    setMinAge(startNumber);
  };

  const searchedValue = (e) => {
    console.log(e.target.value);
    console.log(e.target.value);
    setSearchString(e.target.value);
  };

  // const handlePageClick = (event) => {
  //     setCurrentPage(event.selected)

  //     setSkip(itemPerPage * event.selected)
  // }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goToHome = () => {
    navigate("/home");
  };
  return (
    <>
      <section className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link active"
                    aria-current="page"
                    onClick={goToHome}
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={selectedValue}
                  >
                    <option selected value="0-150">
                      Select Age{" "}
                    </option>
                    <option value="10-20">10-20</option>
                    <option value="20-30"> 20-30</option>
                    <option value="30-40">30-40</option>
                  </select>
                </li>
              </ul>
            </div>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={searchedValue}
              />
              {/* <button className="btn btn-outline-success" type="button" onClick={applyFilter}>Apply</button> */}
            </form>
          </div>
        </nav>
        <div className="card-container">
          {data.result?.map((val) => {
            return (
              <>
                <div className="card cardContent">
                  <img
                    src={IMAGEURL + val.imagePath}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text"> Name : {val.name}</p>
                    <p className="card-text"> Age : {val.age}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemPerPage}
          pageCount={data?.count / itemPerPage}
          setSkip={setSkip}
          setCurrentPage={setCurrentPage}
        />
        {/* <div className="Pagination" id="container"> */}
        {/* <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        pageRangeDisplayed={5}
                        pageCount={data?.count / itemPerPage}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    /> */}

        {/* <Pagination
                        currentPage={currentPage}
                        totalPages={5}
                        onPageChange={handlePageChange}
                    /> */}

        {/* </div> */}
      </section>
    </>
  );
}
