import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import "../css/matchingCafe.css";
import Nav from './nav.js';
import { Container, Row } from 'react-bootstrap';
import Card from './card.js';
import Nav_login from './nav_login.js';
import { Link } from 'react-router-dom';

const supabaseUrl = 'https://xokmtgzlbailqsxrlajk.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function MatchingCafe() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const [cafes, setCafes] = useState([]); // 카페 데이터 저장
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
        }
    }, []);

    // 카페 데이터 불러오기
    useEffect(() => {
        const fetchCafes = async () => {
            try {
                const { data, error } = await supabase
                    .from('cafes')
                    .select('name, image_url, address, latitude, longitude, description'); 

                if (error) {
                    console.error("Error fetching cafes:", error);
                } else {
                    console.log("Fetched cafes:", data); 
                    setCafes(data); 
                }
            } catch (error) {
                console.error("Unexpected error:", error);
            }
            setLoading(false);  // 로딩 완료 처리
        };

        fetchCafes();
    }, []);

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

            <div className="container">
                <Container>
                    <Row>
                        {loading ? (
                            <p>로딩 중...</p> 
                        ) : (
                            cafes.length === 0 ? (
                                <p>카페 정보가 없습니다.</p> 
                            ) : (
                                cafes.map((cafe, index) => (
                                    <Card
                                        key={index}
                                        cafes={cafe}  
                                    />
                                ))
                            )
                        )}
                    </Row>
                </Container>
            </div>
        </div>
    );
}