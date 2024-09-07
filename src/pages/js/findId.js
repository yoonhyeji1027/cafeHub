import { Link } from "react-router-dom";
import React from 'react';
import "../css/findId.css";
import Nav from './nav.js';

export default function findId() {
    return(
        <div>
            <Nav />

            <div className="findId_header">
                <h1 id='findId_title'>ID 찾기</h1>
                <hr />
            </div>
            <div>
                <div className='findId_input'>
                    <input type="text" className='userName' placeholder='이름' autoFocus></input>
                    <input type="phonenumber" className='userPhone' placeholder='전화번호'></input>
                </div>
                <div className='findId_bt'>
                    <button id="findIdBt">찾기</button>
                </div>
                <div className='findId_menu'>
                    <Link to="/findPw.js">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );
  
}

