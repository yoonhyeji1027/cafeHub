import React from 'react';
import "../css/myBoard.css";
import Nav from './nav.js';

export default function MyBoard() {
    return(
        <div>
            <Nav />

            <div className="myBoard_header">
                <h1 id='myBoard_title'>내가 쓴 글</h1>
                <hr />
            </div>
        </div>
    );
  
}

