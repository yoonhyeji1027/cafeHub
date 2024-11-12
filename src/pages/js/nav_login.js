import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../css/nav_login.css";

export default function Nav_login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(''); // 유저 이름 상태 관리

    // 페이지 로드 시 세션에서 유저 정보 가져오기
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            const user = JSON.parse(session);
            setUserName(user.name); // 세션에서 이름 가져와서 상태에 저장
        }
    }, []);

    // 로그아웃
    const handleLogout = () => {
        localStorage.removeItem('session'); // 세션 정보 삭제
        alert('로그아웃 되었습니다.');
        navigate('/login.js'); // 로그인 페이지로 이동
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navPage">
                    <Link to="/main.js">
                        <img src="images/logo.png" alt="Logo" className="navMain" />
                    </Link>
                    <Link className="navMenu" to={'/community.js'}>커뮤니티</Link>
                    <Link className="navMenu" to={'/group.js'}>매칭</Link>
                    <Link className="navMenu" to={'/coffee.js'}>커피정보</Link>
                    <Link className="navMenu" to={'/login.js'} onClick={handleLogout}>로그아웃</Link>
                </div>
                <div className="navMypage">
                    <Link className="navMenu" to={'/mypage.js'}>마이페이지</Link>
                    <p className="navMenu">{userName ? `${userName}` : '유저'}</p>
                </div>
            </nav>
        </div>
    );
}
