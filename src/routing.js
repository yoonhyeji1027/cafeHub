import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main  from "./pages/js/main.js";
import Coffee from "./pages/js/coffee.js";
import Community from "./pages/js/community.js";
import Join from "./pages/js/join.js";
import Login from "./pages/js/login.js";
import Matching from "./pages/js/matching.js";
import Mypage from "./pages/js/mypage.js";



function Routing() {
  return (
    <div className='App'>
      
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/main.js' element={<Main />} />
            <Route path='/coffee.js' element={<Coffee />} />
            <Route path='/community.js' element={<Community />} />
            <Route path='/join.js' element={<Join />} />
            <Route path='/login.js' element={<Login />} />
            <Route path='/matching.js' element={<Matching />} />
            <Route path='/mypage.js' element={<Mypage />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
