import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import "../css/matchingSignUp.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';

export default function MatchingSignUp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [map, setMap] = useState(null);
    const location = useLocation();
    const { cafe } = location.state || {}; 
    console.log("Cafe object from state:", cafe);  // cafe 객체 확인
    console.log("Cafe ID:", cafe?.id);  // cafe.id 값 확인

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true);
        }
    }, []);

    // Supabase 클라이언트 설정
    const supabaseUrl = 'https://xokmtgzlbailqsxrlajk.supabase.co';
    const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    useEffect(() => {
        console.log("Cafe ID:", cafe?.id);  // cafe.id 값 확인
        if (cafe && cafe.id) {
            const fetchDescription = async () => {
                try {
                    const { data, error } = await supabase
                        .from('cafes')  
                        .select('description')  
                        .eq('id', cafe.id)  //
                        .single();  
                    if (data) {
                        setDescription(data.description);
                    } else {
                        setDescription('설명 정보를 불러오는 데 오류가 발생했습니다.');
                    }
                } catch (error) {
                    console.error('Error fetching description:', error);
                    setDescription('설명 정보를 불러오는 데 오류가 발생했습니다.');
                }
            };
            fetchDescription();
        } 
    }, [cafe]);

    const handleMatchClick = () => {
        navigate('/matchingSuccess.js', { state: { cafe } });
    };

    useEffect(() => {
        const loadKakaoMap = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8dffd49fa29ed37ce831b6880ad059e2';
                script.onload = () => resolve();
                script.onerror = (e) => reject(e);
                document.head.appendChild(script);
            });
        };

        loadKakaoMap().then(() => {
            const kakao = window.kakao;
            if (!kakao) {
                console.error("Kakao Maps API 로드 실패");
                return;
            }
            kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                if (!mapContainer) return; // mapContainer가 없으면 초기화하지 않음

                // 카페 정보가 있을 경우 해당 카페의 위도, 경도 정보를 사용
                if (cafe && cafe.latitude && cafe.longitude) {
                    const cafeLatLng = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);

                    const options = {
                        center: cafeLatLng,  // cafe의 위치로 지도 중심 설정
                        level: 3
                    };
                    const mapInstance = new kakao.maps.Map(mapContainer, options);
                    setMap(mapInstance);

                    // 카페 위치에 마커 추가
                    const markerPosition = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        map: mapInstance,
                    });

                    // 마커 위에 카페 이름을 표시하는 커스텀 오버레이 추가
                    const overlayContent = document.createElement('div');
                    overlayContent.style.padding = '5px';
                    overlayContent.style.backgroundColor = 'white';
                    overlayContent.style.border = '1px solid #ddd';
                    overlayContent.style.borderRadius = '5px';
                    overlayContent.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.2)';
                    overlayContent.innerText = cafe.name;

                    const customOverlay = new kakao.maps.CustomOverlay({
                        position: markerPosition,
                        content: overlayContent,
                        yAnchor: 2.3, // 마커 위에 오버레이가 위치하도록 조정
                        map: mapInstance,
                    });
                } else {
                    console.error("카페의 위도와 경도가 없습니다.");
                }
            });
        }).catch((error) => {
            console.error('Kakao 지도 스크립트 로드 실패:', error);
        });
    }, [cafe]);  // cafe 객체가 변경될 때마다 지도 업데이트

    if (!cafe) {
        return <div>카페 정보가 없습니다.</div>;  
    }

    return (
        <>
            {isLoggedIn ? <Nav_login /> : <Nav />}
            <div className="matching-signup-container">
                <div className="map-and-image">
                    <div id="map" className="map-container"></div>
                    <div className="cafe-image">
                        <img src={cafe.image_url} alt={cafe.name} />
                    </div>
                </div>

                <div className="cafe-name">
                    <h1>{cafe.name}</h1>
                </div>

                <div className="cafe-description">
                    <h1>{description || cafe.description}</h1>
                </div>
            </div>

            <div className="matchbutton-container">
                <button className="matchbutton" onClick={handleMatchClick}>
                    매칭하기
                </button>
            </div>
        </>
    );
}
