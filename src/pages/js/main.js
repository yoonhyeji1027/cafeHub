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
                    center: new kakao.maps.LatLng(37.7645305, 128.8996633), 
                    level: 3
                };
                const mapInstance = new kakao.maps.Map(mapContainer, options);
                setMap(mapInstance);
    
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const currentLat = position.coords.latitude;
                        const currentLng = position.coords.longitude;
    
                        const userLocation = new kakao.maps.LatLng(currentLat, currentLng);
    
                        mapInstance.setCenter(userLocation); 
    
                        const currentPositionMarker = new kakao.maps.Marker({
                            position: userLocation,
                            map: mapInstance,
                            image: new kakao.maps.MarkerImage(
                                'https://ifh.cc/g/0KG00s.png', 
                                new kakao.maps.Size(25, 42),   
                            )
                        });
    
                    }, () => {
                        alert("위치 추적에 실패했습니다. 강릉으로 이동합니다.");
                        const center = new kakao.maps.LatLng(37.7645305, 128.8996633);
                        mapInstance.setCenter(center);
                    });
                } else {
                    alert("현재 위치를 사용할 수 없습니다. 강릉으로 이동합니다.");
                    const center = new kakao.maps.LatLng(37.7645305, 128.8996633); 
                    mapInstance.setCenter(center);
                }
    
                const { data: cafes, error } = await supabase.from('cafes').select('*');
                if (error) {
                    console.error('Error fetching cafes:', error);
                    return;
                }

                const markerPositions = cafes.map(cafe => ({
                    name: cafe.name,
                    address: cafe.address,
                    imageUrl: cafe.image_url,
                    imageUrl2: cafe.image_url2,
                    description: cafe.description, 
                    position: new kakao.maps.LatLng(cafe.latitude, cafe.longitude),
                }));

                markerPositions.forEach(({ name, description, position, imageUrl, imageUrl2 }) => {
                    const marker = new kakao.maps.Marker({
                        position,
                        map: mapInstance,
                    });

                    const overlayContent = createOverlayContent(name, imageUrl, imageUrl2, description, () => {
                        overlay.setMap(null);
                    });

                    const overlay = new kakao.maps.CustomOverlay({
                        content: overlayContent,
                        position: position,
                        yAnchor: 1.13, 
                    });

                    kakao.maps.event.addListener(marker, 'click', () => {
                        const position = marker.getPosition();
                        const newCenter = new kakao.maps.LatLng(position.getLat() + 0.0025, position.getLng());                   
                        mapInstance.setCenter(newCenter);
                        overlay.setMap(mapInstance);
                    });
                });
            });
        });
    }, []);


    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        function toRad(value) {
            return (value * Math.PI) / 180;
        }

        const R = 6371; 
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c * 1000; 
        return distance;
    };


    const handleSearch = async () => {
        const input = document.getElementById('address-input').value.trim();
        const { data: cafes, error } = await supabase.from('cafes').select('*');
    
        if (error) {
            console.error('Error fetching cafes:', error);
            return;
        }
    
        const matchedCafe = cafes.find(cafe => 
            cafe.address.trim().toLowerCase() === input.toLowerCase() ||
            cafe.name.trim().toLowerCase() === input.toLowerCase()
        );
    
        let overlay = null;
    
        if (matchedCafe) {
            const cafeCoords = new kakao.maps.LatLng(matchedCafe.latitude, matchedCafe.longitude);
            map.setCenter(new kakao.maps.LatLng(matchedCafe.latitude + 0.0025, matchedCafe.longitude)); 
    
            const cafeMarker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(matchedCafe.latitude +0.005, matchedCafe.longitude)
            });
    
            const overlayContent = createOverlayContent(
                matchedCafe.name, 
                matchedCafe.image_url, 
                matchedCafe.image_url2, 
                matchedCafe.description, 
                () => overlay.setMap(null) 
            );
    
            overlay = new kakao.maps.CustomOverlay({
                content: overlayContent,
                position: cafeCoords, 
                yAnchor: 1.13, 
            });
    
            overlay.setMap(map); 
    
            kakao.maps.event.addListener(cafeMarker, 'click', () => {
                overlay.setMap(map);
                overlay.setPosition(cafeCoords); 
            });
        } else {
            alert('현재 카페 정보가 없습니다.');
        }
    };
    

    const createOverlayContent = (name, imageUrl, imageUrl2, description, closeOverlay) => {
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
    
        const closeButton = document.createElement('div');
        closeButton.className = "close";
        closeButton.title = "닫기";
        closeButton.style.cursor = "pointer";
        closeButton.innerHTML = 'X';
        closeButton.onclick = closeOverlay; 
    
        title.appendChild(closeButton);
        info.appendChild(title);
    
        if (imageUrl) {
            const image = document.createElement('img');
            image.src = imageUrl;
            image.className = "cafe-image"; 
            console.log('First Image URL:', imageUrl); 
            info.appendChild(image);
        }

    
        if (imageUrl2) {
            const image = document.createElement('img');
            image.src = imageUrl2;
            image.className = "cafe-image2"; 
            info.appendChild(image); 
        }



        const desc = document.createElement('div'); 
        desc.className = "description";
        desc.innerHTML = (description || 'No description available').replace(/\n/g, '<br />'); 
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