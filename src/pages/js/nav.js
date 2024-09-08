import { Link } from "react-router-dom";
import React from "react";
import "../css/nav.css";

export default function Nav() {
    return (
        <div>
            <nav className="navbar">
                <div className="navPage">
                    <Link to="/main.js">
                        <img src="images/logo.png" alt="Logo" className="navMain" />
                    </Link>
                    <Link className="navMenu" to={'/community.js'}>커뮤니티</Link>
                    <Link className="navMenu" to={'/matching.js'}>매칭</Link>
                    <Link className="navMenu" to={'/coffee.js'}>커피정보</Link>
                    <Link className="navMenu" to={'/login.js'}>로그인</Link>
                </div>
                <div className="navMypage">
                    <Link className="navMenu" to={'/mypage.js'}>마이페이지</Link>
                </div>
            </nav>

        </div>
    );
}