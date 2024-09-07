import { Link } from 'react-router-dom';
import React from 'react';
import "../css/community.css";
import Nav from './nav.js';

export default function Community() {
    return(
        <div>
            <Nav />

            <div className='community_header'>
                <h1>Café Hub</h1>
                <p>in 강릉</p>
            </div>
            <div className='commu_bt'>
                <Link to="/myBoard.js">
                <button className='myBoardBt'>내가 쓴 글</button>
                </Link>
                <Link to="/addBoard.js">
                <button className='addBoardBt'>글 쓰기</button>
                </Link>
            </div>
        </div>
    );
  
}

