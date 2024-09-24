import React, { useEffect, useState } from 'react';
import "../css/coffee.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';

export default function Coffee() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
        }
    }, []);
    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}

            <div className='coffee_header'>
                <h1>Origins</h1>
                <p>of 강릉 Coffee</p>
            </div>
            <div className='coffee_info'>
                <img src="images/coffee_info.png" className='coffee_img'></img>
                <p>강릉커피거리의 역사는 1980~1990년대로 거슬러 올라간다. 지금처럼 근사한 카페가 아니라 소박한 자판기가 커피를 담당하던 시절이다. 안목해변에는 유난히 커피 자판기가 많아, 50대가 넘은 적도 있었다. 강릉 젊은이들이 자판기 커피 한잔 들고 바다를 감상하던 것이 커피거리의 시초다. 이곳 자판기 커피가 맛있다고 입소문이 났다. 자판기마다 맛도 조금씩 달라, 사람들은 카페를 골라 가듯 마음에 드는 자판기를 단골로 삼았다. 자판기 주인장의 손맛이 더해진 커피는 아름다운 바다와 어우러져 격이 다를 수밖에 없었다.
                </p>
            </div>

            <div className='beans_header'>
                <hr />
                <h1>Beans</h1>
            </div>
            <div className='beans_info'>
                <div className='beans_type'>
                    <h2>아라비카</h2>
                    <h3>|</h3>
                    <p id='beans_type_p'>아라비카 원두는 전 세계적으로 가장 일반적으로 소비되는 커피 원두입니다. 아라비카 커피 원두를 에스프레소로 마시면 약간 달콤하고 신맛이 나는 온화하고 섬세한 맛이 있습니다. 아라비카 원두는 향이 좋은 특성 때문에 종종 선호됩니다.
                    </p>
                </div>
                <div className='beans_type'>
                    <h2>로부스타</h2>
                    <h3>|</h3>
                    <p id='beans_type_p'>로부스타 원두는 아라비카 원두에 비해 더 강하고 쓴 맛이 있습니다. 그들은 더 높은 카페인 함량을 함유하고 있으며 흙내음과 견과류 맛으로 유명합니다. 로부스타 원두는 풍부하고 풀바디한 풍미를 제공하기 위해 에스프레소 블렌드에 자주 사용됩니다.
                    </p>
                </div>
            </div>
        </div>
    );

}

