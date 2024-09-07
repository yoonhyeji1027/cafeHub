import { Link } from "react-router-dom";
import React from 'react';
import "../css/login.css";
import Nav from './nav.js';

export default function Login() {
    return (
        <div>
            <Nav />

            <div className="login_header">
                <h1 id='login_title'>로그인</h1>
                <p>로그인하시면 커뮤니티/ 맞춤 매칭 등의 정보서비스를 이용하실 수 있습니다.</p>
                <hr />
            </div>
            <div>
                <div className='login_input'>
                    <input type="text" className='userIdLogin' placeholder='아이디' autoFocus></input>
                    <input type="password" className='userPasswordLogin' placeholder='비밀번호'></input>
                </div>
                <div className='login_bt'>
                    <button id="loginBt">로그인</button>
                    <Link to="/signUp.js">
                        <button id="signUpBt">회원가입</button>
                    </Link>
                </div>
                <div className='login_menu'>
                    <Link to="/findId.js">아이디 찾기</Link>
                    <Link to="/findPw.js">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );

}

