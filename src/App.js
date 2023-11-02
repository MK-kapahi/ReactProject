
import './App.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from './Components/Home';
import UpdateUser from './Components/UpdateUser';
import Login from './Components/Public/Login';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/home' element={<Home />}></Route>
          <Route exact path='/update/:id' element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
