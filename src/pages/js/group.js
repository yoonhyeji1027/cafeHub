import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../css/group.css";
import Nav from './nav.js';
import Voc from "./voc.js";
import Nav_login from './nav_login.js';

export default function Group() {
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

            <div className='matching_bt'>
                <Link to="/group.js">
                <button className='groupBt'>모임</button>
                </Link>
                <Link to="/matchingCafe.js">
                <button className='matchingCafeBt'>매칭</button>
                </Link>
            </div>

            <Voc />
        </div>
    );
  
}

