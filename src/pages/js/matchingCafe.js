import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../css/matchingCafe.css";
import Nav from './nav.js';
import { Container, Row } from 'react-bootstrap';
import Card from './card.js';
import Nav_login from './nav_login.js';

export default function MatchingCafe() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
        }
    }, []);
    const [cafes] = useState([
        {
            id: 0,
            title: "카페1",
            content: "Born in gangneung",
            location: "강릉시 노암동",
        },
        {
            id: 1,
            title: "카페2",
            content: "Born in gangneung",
            location: "강릉시 포남동",
        },
        {
            id: 2,
            title: "카페3",
            content: "Born in gangneung",
            location: "강릉시 입암동",
        },
        {
            id: 3,
            title: "카페4",
            content: "Born in gangneung",
            location: "강릉시 교동",
        },
        {
            id: 4,
            title: "카페5",
            content: "Born in gangneung",
            location: "강릉시 내곡동",
        },
    ]);

    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}

            <div className="matching_bt">
                <Link to="/group.js">
                    <button className="groupBt">모임</button>
                </Link>
                <Link to="/matchingCafe.js">
                    <button className="matchingCafeBt">매칭</button>
                </Link>
            </div>

            <div className='container'>
                <Container>
                    <Row>
                        {cafes.map((cafe) => (
                            <Card key={cafe.id} cafes={cafe} />
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}
