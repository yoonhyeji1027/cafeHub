import { Link } from 'react-router-dom';
import React from 'react';
import "../css/matching.css";
import Nav from './nav.js';

export default function Matching() {
  
    return(
        <div>
            <Nav />

            <div className='matching_bt'>
                <Link to="/group.js">
                <button className='groupBt'>모임</button>
                </Link>
                <Link to="/matchingCafe.js">
                <button className='matchingCafeBt'>매칭</button>
                </Link>
            </div>
        </div>
    );
}

