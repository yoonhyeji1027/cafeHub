import { Link } from "react-router-dom";
import React from 'react';
import "../css/signUp.css";
import Nav from './nav.js';

export default function signUp() {
    return (
        <div>
            <Nav />

            <div className="signUp_header">
                <h1 id='signUp_title'>회원가입</h1>
                <hr />
            </div>
            <div>
                <div className='signUp_input'>
                    <input type="text" className='userName' placeholder='이름' autoFocus></input>
                    <input type="phonenumber" className='userPhone' placeholder='전화번호'></input>
                    <div className="idCheck">
                    <input type="text" className='userId' placeholder='아이디'></input>
                    <button id="idCheck_bt">확인</button>
                    </div>
                    <input type="password" className='userPassword' placeholder='비밀번호'></input>
                    <input type="password" className='userPassword_re' placeholder='비밀번호 확인'></input>
                </div>
                <div className='signUp_bt'>
                    <button id="joinBt">가입</button>
                </div>
                <div className='signUp_menu'>
                    <Link to="/findId.js">아이디 찾기</Link>
                    <Link to="/findPw.js">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );

}

