/* global kakao */
import React, { useEffect, useState } from 'react';
import "../css/main.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xokmtgzlbailqsxrlajk.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Main() {
    const [map, setMap] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [markers, setMarkers] = useState([]);
    

    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); 
        }
    }, []);

    const new_script = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.addEventListener('load', () => {
                resolve();
            });
            script.addEventListener('error', e => {
                reject(e);
            });
            document.head.appendChild(script);
        });
    };

    useEffect(() => {
        const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8dffd49fa29ed37ce831b6880ad059e2');

        my_script.then(() => {
            const kakao = window['kakao'];
            kakao.maps.load(async () => {
                const mapContainer = document.getElementById('map');
                const options = {
                    center: new kakao.maps.LatLng(37.7645305, 128.8996633), // 강릉 좌표
                    level: 3
                };
                const mapInstance = new kakao.maps.Map(mapContainer, options);
                setMap(mapInstance);

                // Supabase에서 카페 데이터를 가져와 마커 추가
                const { data: cafes, error } = await supabase.from('cafes').select('*');
                if (error) {
                    console.error('Error fetching cafes:', error);
                    return;
                }

                const markerPositions = cafes.map(cafe => ({
                    name: cafe.name,
                    address: cafe.address,
                    description: cafe.description, 
                    position: new kakao.maps.LatLng(cafe.latitude, cafe.longitude),
                }));

                markerPositions.forEach(({ name, description, position }) => {
                    const marker = new kakao.maps.Marker({
                        position,
                        map: mapInstance,
                    });

                    const overlayContent = createOverlayContent(name, description, () => {
                        overlay.setMap(null);
                    });
                    
                    const overlay = new kakao.maps.CustomOverlay({
                        content: overlayContent,
                        position: position,
                        yAnchor: 1, // 마커 아래쪽에 오도록 설정
                    });

                    kakao.maps.event.addListener(marker, 'click', () => {
                        overlay.setMap(mapInstance);
                    });
                });
            });
        });
    }, []);

    const handleSearch = () => {
        const address = document.getElementById('address-input').value;
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                map.setCenter(coords);

                // 검색된 위치에 마커 추가
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 마커 클릭 시 인포윈도우 표시
                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${address}</div>`
                });
                infowindow.open(map, marker);
            } else {
                alert('현재 카페 정보가 없습니다.');
            }
        });
    };

    const createOverlayContent = (name, description, closeOverlay) => {
        const content = document.createElement('div');
        content.className = "wrap";
        content.style.position = "relative";
        content.style.backgroundColor = "white";
        content.style.padding = "10px";
        content.style.borderRadius = "5px";
        content.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    
        const arrow = document.createElement('div');
        arrow.className = "arrow";
        arrow.style.position = "absolute";
        arrow.style.marginLeft = "-10px";
        arrow.style.borderWidth = "10px";
        arrow.style.borderStyle = "solid";
        arrow.style.borderColor = "white transparent transparent transparent";
    
        const info = document.createElement('div');
        info.className = "info";
    
        const title = document.createElement('div');
        title.className = "title";
        title.innerHTML = name; 
    
        const desc = document.createElement('div'); 
        desc.className = "description";
        desc.innerHTML = description.replace(/\n/g, '<br />'); // 줄 바꿈을 <br />로 변환
    
        const closeButton = document.createElement('div');
        closeButton.className = "close";
        closeButton.title = "닫기";
        closeButton.style.cursor = "pointer";
        closeButton.innerHTML = 'X';
        closeButton.onclick = closeOverlay; 
    
        title.appendChild(closeButton);
        info.appendChild(title);
        info.appendChild(desc); 
    
        content.appendChild(arrow);
        content.appendChild(info);
    
        return content;
    };
    
    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}
            <div className='main_header'>
                <h1>Café Hub</h1>
                <p>in 강릉</p>
            </div>
            <div className="search-container">
                <input type="text" id="address-input" placeholder="주소를 입력하세요" />
                <button id="search-button" onClick={handleSearch}>주소 검색</button>
            </div>
            <div id="map" className="map" style={{ width: '1400px', height: '700px', marginTop: '60px' }}></div>
        </div>
    );
}
