import React, { useEffect, useState } from 'react';
import "../css/myBoard.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';

export default function MyBoard() {
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

            <div className="myBoard_header">
                <h1 id='myBoard_title'>내가 쓴 글</h1>
                <hr />
            </div>
        </div>
    );
  
}

