import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main  from "./pages/js/main.js";
import Coffee from "./pages/js/coffee.js";
import Community from "./pages/js/community.js";
import SignUp from "./pages/js/signUp.js";
import Login from "./pages/js/login.js";
import Matching from "./pages/js/matching.js";
import Mypage from "./pages/js/mypage.js";
import FindId from "./pages/js/findId.js";
import FindPw from "./pages/js/findPw.js";
import AddBoard from "./pages/js/addBoard.js";
import MyBoard from "./pages/js/myBoard.js";



function Routing() {
  return (
    <div className='App'>
      
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/main.js' element={<Main />} />
            <Route path='/coffee.js' element={<Coffee />} />
            <Route path='/community.js' element={<Community />} />
            <Route path='/signUp.js' element={<SignUp />} />
            <Route path='/login.js' element={<Login />} />
            <Route path='/matching.js' element={<Matching />} />
            <Route path='/mypage.js' element={<Mypage />} />
            <Route path='/findId.js' element={<FindId />} />
            <Route path='/findPw.js' element={<FindPw />} />
            <Route path='/myBoard.js' element={<MyBoard />} />
            <Route path='/addBoard.js' element={<AddBoard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
