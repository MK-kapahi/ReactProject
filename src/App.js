
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import UpdateUser from "./View/Private/editUser";
import FilterPage from "./View/Private/filterPage";
import Home from "./View/Private/home";
import Login from "./View/Public/Login";

function App() {
  console.log(process.env.REACT_APP_API_BASE_URL)
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/home' element={<Home />}></Route>
          <Route exact path='/home/applyFilter' element={<FilterPage />} > </Route>
          <Route exact path='/home/update/:id' element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
