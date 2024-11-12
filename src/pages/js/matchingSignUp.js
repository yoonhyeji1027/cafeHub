import React, { useState, useEffect } from 'react';  // useState와 useEffect를 추가합니다.
import { useLocation, useNavigate } from 'react-router-dom';  
import "../css/matchingSignUp.css";  
import Nav_login from './nav_login.js';
import Nav from './nav.js';

const MatchingSignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();  
    const { cafe } = location.state || {}; 

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
        }
    }, []);

    if (!cafe) {
        return <div>카페 정보가 없습니다.</div>;  
    }

    const handleMatchClick = () => {
        navigate('/matchingSuccess', { state: { cafe } });
    };
  
    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}

            <div className="matching-signup-container">
                <div className="cafe-title">
                    <h1>{cafe.title}</h1>
                </div>
                <div className="cafe-image">
                    <img src={cafe.image_url} alt={cafe.title} />
                </div>
                <div className="cafe-address">
                    <p>{cafe.address}</p>
                </div>
                <div className="matchbutton-container">
                    <button className="matchbutton" onClick={handleMatchClick}>
                        매칭하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchingSignUp;
