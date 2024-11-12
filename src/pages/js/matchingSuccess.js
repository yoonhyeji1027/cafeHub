import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../css/matchingSuccess.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';

export default function Matching() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        purpose: '',
        expectation: '',
        maxParticipants: ''
    }); 

    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
        }
    }, []);

 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        alert('매칭신청이 완료되었습니다!');
 
    };

    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}
            <div className="matching-form-container">
                <h2>모임 매칭 신청</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="purpose">모임 목적</label>
                        <input
                            type="text"
                            id="purpose"
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleInputChange}
                            placeholder="모임 목적을 입력하세요"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expectation">바라는 점</label>
                        <input
                            type="text"
                            id="expectation"
                            name="expectation"
                            value={formData.expectation}
                            onChange={handleInputChange}
                            placeholder="바라는 점을 입력하세요"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maxParticipants">최대 인원수</label>
                        <input
                            type="text"
                            id="expectation"
                            name="expectation"
                            value={formData.expectation}
                            onChange={handleInputChange}
                            placeholder="인원수를 입력하세요"
                        />
                    </div>
                    <button type="submit" className="submit-button">매칭신청</button>
                </form>
            </div>
        </div>
    );
}
