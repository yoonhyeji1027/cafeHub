import React, { useEffect, useState } from 'react';
import "../css/addBoard.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';

export default function AddBoard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
        }
    }, []);
    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}

            <div className="addBoard_header">
                <h1 id='addBoard_title'>글 쓰기</h1>
                <hr />
            </div>
            <div className='addBoard_form'>
                <div className='addBoard_menu'>
                    <h4>제    목</h4> <p>|</p>
                    <div className='addBoard_input'>
                        <input type="text" className='addBoardTitle' placeholder='제목' autoFocus></input>
                    </div>
                </div>
                <div className='addBoard_menu'>
                    <h4>사진첨부</h4> <p>|</p>
                    <div className='addBoard_input'>
                        <input type="text" className='addBoardPicture' placeholder='사진'></input>
                    </div>
                </div>
                <div className='addBoard_menu'>
                    <h4>내    용</h4> <p>|</p>
                    <div className='addBoard_input'>
                        <input type="text" className='addBoardDetail' placeholder='내용'></input>
                    </div>
                </div>
            </div>
            <div className='addBoard_bt'>
                <button className='addBoardAddBt'>발행하기</button>
            </div>
        </div>
    );

}

