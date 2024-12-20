import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/js/main.js";
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
import PostDetail from "./pages/js/postDetail.js";
import Group from "./pages/js/group.js";
import MatchingCafe from "./pages/js/matchingCafe.js";
import MatchingSignUp from "./pages/js/matchingSignUp.js";
import MatchingSuccess from "./pages/js/matchingSuccess.js";
import GroupForm from "./pages/js/groupForm.js";
import GroupDetail from "./pages/js/groupDetail.js";
import ApprovePage from "./pages/js/approvePage.js";
import RejectPage from "./pages/js/rejectPage.js";



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
          <Route path='/postDetail.js' element={<PostDetail />} />
          <Route path='/group.js' element={<Group />} />
          <Route path='/matchingCafe.js' element={<MatchingCafe />} />
          <Route path='/matchingSignUp.js' element={<MatchingSignUp />} />
          <Route path='/matchingSuccess.js' element={<MatchingSuccess />} />
          <Route path='/groupForm.js' element={<GroupForm />} />
          <Route path='/groupDetail.js' element={<GroupDetail />} />
          <Route path="/approvePage.js" element={<ApprovePage />} />
          <Route path="/rejectPage.js" element={<RejectPage />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;