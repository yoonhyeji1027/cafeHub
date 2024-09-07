import { Link } from 'react-router-dom'
import React from 'react';
import "../css/findPw.css";
import Nav from './nav.js';

export default function findPw() {
    return(
        <div>
            <Nav />

            <div className="findPw_header">
                <h1 id='findPw_title'>P/W 찾기</h1>
                <hr />
            </div>
            <div>
                <div className='findPw_input'>
                    <input type="text" className='userName' placeholder='이름' autoFocus></input>
                    <input type="phonenumber" className='userPhone' placeholder='전화번호'></input>
                    <input type="text" className='userIdLogin' placeholder='아이디'></input>
                </div>
                <div className='findPw_bt'>
                    <button id="findPwBt">찾기</button>
                </div>
                <div className='findPw_menu'>
                    <Link to="/findId.js">아이디 찾기</Link>
                </div>
            </div>
        </div>
    );
  
}

