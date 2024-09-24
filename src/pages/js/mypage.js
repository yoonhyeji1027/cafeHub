import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../css/mypage.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';

export default function Mypage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
        }
    }, []);
    return(
        <div>
           {isLoggedIn ? <Nav_login /> : <Nav />}

           <div className="myPage_header">
                <h1 id='myPage_title'>마이페이지</h1>
                <hr />
            </div>
            <div>
                <div className='myPage_input'>
                    <input type="text" className='userName' placeholder='이름' autoFocus></input>
                    <input type="phonenumber" className='userPhone' placeholder='전화번호'></input>
                    <div className="idCheck">
                    <input type="text" className='userIdLogin' placeholder='아이디'></input>
                    </div>
                    <input type="password" className='userPassword' placeholder='비밀번호'></input>
                </div>
                <div className='myPage_bt'>
                    <button id="myPageBt">수정</button>
                </div>
            </div>
        </div>
    );
  
}

