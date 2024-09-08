import { Link } from 'react-router-dom';
import React from 'react';
import "../css/mypage.css";
import Nav from './nav.js';

export default function Mypage() {
    return(
        <div>
           <Nav />

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

