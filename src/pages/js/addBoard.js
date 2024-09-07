import React from 'react';
import "../css/addBoard.css";
import Nav from './nav.js';

export default function AddBoard() {
    return(
        <div>
            <Nav />

            <div className="addBoard_header">
                <h1 id='addBoard_title'>글 쓰기</h1>
                <hr />
            </div>
            <div className='addBoard_form'>
                <div className='addBoard_menu'>
                <h4>제    목</h4> <p>|</p>
                </div>
                <div className='addBoard_menu'>
                <h4>사진첨부</h4> <p>|</p>
                </div>
                <div className='addBoard_menu'>
                <h4>내    용</h4> <p>|</p>
                </div>
            </div>
        </div>
    );
  
}

