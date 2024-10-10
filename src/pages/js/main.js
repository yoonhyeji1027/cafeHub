/* global kakao */
import React, { useEffect, useState } from 'react';
import "../css/main.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';

export default function Main() {
    const [overlay, setOverlay] = useState(null); 
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
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

    const createOverlayContent = (name, closeOverlay) => {
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

        content.appendChild(arrow);
        content.appendChild(info);

        return content;
    };

    useEffect(() => { 
        const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8dffd49fa29ed37ce831b6880ad059e2');   

        my_script.then(() => { 
            const kakao = window['kakao']; 
            kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                const options = { 
                    center: new kakao.maps.LatLng(37.7645305, 128.8996633), 
                    level: 3
                }; 
                const mapInstance = new kakao.maps.Map(mapContainer, options); 
                setMap(mapInstance);

                const markerPositions = [
                    { name: "이디야", address: "강원 강릉시 용지로 174-6", position: new kakao.maps.LatLng(37.7638571728054, 128.900255265091) }, 
                    { name: "에이브릭", address: "강원 강릉시 명륜로 57 1", position: new kakao.maps.LatLng(37.764978428, 128.897797700867) }, 
                    { name: "이스트", address: "강원 강릉시 화부산로 183", position: new kakao.maps.LatLng(37.7657724760667, 128.897805970184) }, 
                    { name: "비바빌리지", address: "강원 강릉시 용지로 167", position: new kakao.maps.LatLng(37.7630490669409, 128.899917765564) },
                    { name: "라스텔리나", address:"강원 강릉시 강릉대로 282", position: new kakao.maps.LatLng(37.7621076418795, 128.899881534644) },
                    { name: "구공커피", address:"강원 강릉시 남구길29번길 19", position: new kakao.maps.LatLng(37.7640868551192, 128.903259486937) },
                    { name: "옹막상회", address:"강원 강릉시 중기2길 11", position: new kakao.maps.LatLng(37.7625258027542, 128.902237935326) },
                    { name: "비사이드그라운드", address:"강원 강릉시 용지로 136 1", position: new kakao.maps.LatLng(37.7611490127417, 128.903054484731) },
                    { name: "홀리데이빈티지", address:"강원 강릉시 옥천로 48", position: new kakao.maps.LatLng(37.759852648995, 128.900602457668) },
                    { name: "은달래 강릉점", address:"강원 강릉시 옥가로 17", position: new kakao.maps.LatLng(37.757926941012, 128.89895875603) },
                    { name: "고래빵집", address:"강원 강릉시 율곡로 2848", position: new kakao.maps.LatLng(37.7582470978821, 128.89723114192) },
                    { name: "카페달리", address:"강원 강릉시 율곡로 2836", position: new kakao.maps.LatLng(37.7574585624579, 128.89797676975) },
                    { name: "와타빈 강릉점", address:"강원 강릉시 율곡로 2820", position: new kakao.maps.LatLng(37.7561840078657, 128.899371330283) },
                    { name: "빵굽는 보혜씨", address:"강원 강릉시 옥천로19번길 19", position: new kakao.maps.LatLng(37.756311415182, 128.901363366083) },
                    { name: "월화엔", address:"강원 강릉시 토성로184번길 6", position: new kakao.maps.LatLng(37.7565966745874, 128.896178586906) },
                    { name: "커더지 커피", address:"강원 강릉시 금성로14번길 13", position: new kakao.maps.LatLng(37.7552752880741, 128.89797078317) },
                    { name: "카페시로울", address:"강원 강릉시 대학길 12 2층", position: new kakao.maps.LatLng(37.7541520008307, 128.896322101278) },
                    { name: "100년임당방앗간", address:"강원 강릉시 경강로2095번길", position: new kakao.maps.LatLng(37.7551203405556, 128.895480890361) },
                    { name: "이응", address:"강원 강릉시 신대학길 22-5", position: new kakao.maps.LatLng(37.7531993754554, 128.895957291213) },
                    { name: "오솔길", address:"강원 강릉시 신대학길 18", position: new kakao.maps.LatLng(37.7529689317752, 128.895263513932) },
                    { name: "범스뱅", address:"강원 강릉시 임영로116번길 3-1", position: new kakao.maps.LatLng(37.752167208374, 128.894186321801) },
                    { name: "타임슬립", address:"강원 강릉시 중앙시장길 16", position: new kakao.maps.LatLng(37.7534322149004, 128.898230476591) },
                    { name: "베리베리딸기", address:"강원 강릉시 임영로164번길 16-2", position: new kakao.maps.LatLng(37.7558226221548, 128.893268827468) },
                    { name: "르봉마젤", address:"강원 강릉시 임영로180번길 16", position: new kakao.maps.LatLng(37.7569627550718, 128.89337368718) },
                    { name: "인솔트베이커리", address:"강원 강릉시 강릉대로194번길 12", position: new kakao.maps.LatLng(37.7574945928551, 128.893274008719) },
                    { name: "차리프", address:"강원 강릉시 토성로 165-6", position: new kakao.maps.LatLng(37.7563505418171, 128.89427599505) },
                    { name: "던", address:"강원 강릉시 경강로2069번길 10", position: new kakao.maps.LatLng(37.754124474568, 128.893440658605) },
                    { name: "오프더월", address:"강원 강릉시 토성로 133", position: new kakao.maps.LatLng(37.7545241181459, 128.891419794554) },
                    { name: "카페초이", address:"강원 강릉시 임영로155번길 11-2", position: new kakao.maps.LatLng(37.7546090349381, 128.890512571743) },
                    { name: "1938 slow", address:"강원 강릉시 임영로141번길 4-6", position: new kakao.maps.LatLng(37.7539488715111, 128.891069872681) },
                    { name: "aie", address:"강원 강릉시 경강로 2040", position: new kakao.maps.LatLng(37.7510840302356, 128.891921480523) },
                    { name: "봉봉방앗간", address:"강원 강릉시 경강로2024번길 17-1", position: new kakao.maps.LatLng(37.7510373528091, 128.89244399969) },
                    { name: "오월커피", address:"강원 강릉시 경강로2046번길 11-2", position: new kakao.maps.LatLng(37.7508860791479, 128.89315751981) },
                    { name: "평탄", address:"강원 강릉시 경강로2015번길 4", position: new kakao.maps.LatLng(37.7497111263575, 128.890104054602) },
                    { name: "온전", address:"강원 강릉시 남문길 25 ", position: new kakao.maps.LatLng(37.7498170911108, 128.89206688004) },
                    { name: "르블루", address:"강원 강릉시 임영로 99-6 ",  position: new kakao.maps.LatLng(37.7505818768757, 128.894949944937) },
                    { name: "임당동162", address:"강원 강릉시 토성로 144 ", position: new kakao.maps.LatLng(37.754788070524, 128.892631128644) },
                    { name: "카페범", address:"강원 강릉시 강릉대로 337-10", position: new kakao.maps.LatLng(37.766575545593, 128.90356987699) },
                    { name: "카페디드", address:"강원 강릉시 강릉대로 340", position: new kakao.maps.LatLng(37.7657339326049, 128.904726531405) },
                    { name: "다온커피", address:"강원 강릉시 용지각길 20", position: new kakao.maps.LatLng(37.7613953138601, 128.905801111987) },
                    { name: "차온", address:"강원 강릉시 중기2길 2", position: new kakao.maps.LatLng(37.7628950440792, 128.903108881583) },
                    { name: "우드바우어", address:"강원 강릉시 남구길29번길 3", position: new kakao.maps.LatLng(37.7650631517182, 128.904721917876) },
                    { name: "테에나", address:"강원 강릉시 경강로 2239", position: new kakao.maps.LatLng(37.7639964701877, 128.907538905132) },
                    { name: "해미루&명륜과자점", address:"강원 강릉시 명륜로 21-1 1층", position: new kakao.maps.LatLng(37.7619842662107, 128.895813711707) },
                    { name: "이진리", address:"강원 강릉시 임영로 234 ", position: new kakao.maps.LatLng(37.7620482177615, 128.892564605718) },
                    { name: "교동 899", address:"강원 강릉시 임영로 223 ", position: new kakao.maps.LatLng(37.7611459647132, 128.891945775741) },
                    { name: "러브레터", address: "강원 강릉시 율곡로 2930", position: new kakao.maps.LatLng(37.7641180710751, 128.892060545001) },
                    { name: "카페랑", address:"강원 강릉시 성덕포남로213번길 32", position: new kakao.maps.LatLng(37.7680577453691, 128.903572478008) },

                ];

                const createdMarkers = markerPositions.map(({ name, address, position }) => {
                    const marker = new kakao.maps.Marker({
                        map: mapInstance, 
                        position: position
                    });
                    kakao.maps.event.addListener(marker, 'click', function() {
                        const adjustedPosition = new kakao.maps.LatLng(position.getLat() + 0.0026, position.getLng() + 0.0000);

                        if (overlay) {
                            overlay.setMap(null); 
                        }

                        const customOverlay = new kakao.maps.CustomOverlay({
                            content: createOverlayContent(name, () => closeOverlay(customOverlay)), 
                            map: mapInstance, 
                            position: adjustedPosition
                        });

                        setOverlay(customOverlay);
                    });

                    return { name, address, marker };
                });

                setMarkers(createdMarkers);

                kakao.maps.event.addListener(mapInstance, 'center_changed', () => {
                    if (overlay) {
                        const currentPosition = overlay.getPosition();
                        overlay.setPosition(currentPosition);
                    }
                });
            });
        }).catch(error => {
            console.error('스크립트를 불러오는 중 오류 발생:', error);
        });
    }, []); 

    const closeOverlay = (customOverlay) => {
        if (customOverlay) {
            customOverlay.setMap(null); 
            setOverlay(null);
        }
    };

    const handleSearch = () => {
        const input = document.getElementById('address-input').value;
        const foundMarker = markers.find(markerObj => markerObj.address === input || markerObj.name === input);

        if (foundMarker) {
            map.setCenter(foundMarker.marker.getPosition());
            
            if (overlay) {
                overlay.setMap(null); 
            }

            const customOverlay = new kakao.maps.CustomOverlay({
                content: createOverlayContent(foundMarker.name, () => closeOverlay(customOverlay)), 
                map: map, 
                position: foundMarker.marker.getPosition()
            });

            setOverlay(customOverlay);
        } else {
            alert("현재 카페 정보가 없습니다.");
        }
    };

    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}
            <div className='main_header'>
                <h1>Café Hub</h1>
                <p>in 강릉</p>
            </div>
            <div className="search-container">
                <input type="text" id="address-input" placeholder="주소 및 카페를 입력하세요" />
                <button id="search-button" onClick={handleSearch}> 검색</button>
            </div>
            <div id="map" className="map" style={{ width: '1400px', height: '700px', marginTop: '60px' }}></div>
        </div>
    );
}
