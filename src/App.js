
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './Components/Private/Home';
import UpdateUser from './Components/Private/UpdateUser';
import Login from './Components/Public/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterPage from './Components/Private/FilterPage';

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
