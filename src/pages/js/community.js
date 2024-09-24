import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../css/community.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';

export default function Community() {
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

            <div className='community_header'>
                <h1>Café Hub</h1>
                <p>in 강릉</p>
            </div>
            <div className='commu_bt'>
                <Link to="/myBoard.js">
                <button className='myBoardBt'>내가 쓴 글</button>
                </Link>
                <Link to="/addBoard.js">
                <button className='addBoardBt'>글 쓰기</button>
                </Link>
            </div>
        </div>
    );
  
}

