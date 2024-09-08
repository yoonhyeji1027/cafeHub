import React from 'react';
import "../css/main.css";
import Nav from './nav.js';

export default function Main() {
    return (
        <div>
            <Nav />

            <div className='main_header'>
                <h1>Café Hub</h1>
                <p>in 강릉</p>
            </div>
        </div>
    );

}

