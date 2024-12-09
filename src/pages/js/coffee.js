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
                <img src="images/coffee_info.png" className='coffee_img' alt="Coffee street"></img>
                <p>강릉커피거리의 역사는 1980~1990년대로 거슬러 올라간다. 당시에는 지금처럼 세련된 카페들이 아니라, 소박한 커피 자판기들이 해변을 채우고 있었다. 특히 안목해변은 유난히 커피 자판기가 많아서 한때 50대가 넘는 자판기가 줄지어 서 있기도 했다. 당시 강릉의 젊은이들이 
                    자판기 커피 한잔을 들고 바다를 바라보며 시간을 보내는 모습은 지금의 커피거리 문화의 기원이 되었다.</p>
                <p>오늘날 강릉 커피거리는 단순한 커피 소비의 장소를 넘어, 전통과 현대가 어우러진 독특한 공간으로 자리 잡았다. 이곳에서는 소박한 자판기의 추억을 간직한 작은 카페부터 트렌디한 현대식 카페까지, 다양한 커피 문화를 경험할 수 있다.
                     해변을 따라 늘어선 카페들은 각각의 개성을 뽐내며 방문객들에게 특별한 커피 한 잔을 제공한다.</p>
                <p>강릉 커피거리의 매력은 커피 그 이상의 가치를 담고 있다. 이곳에서는 단순히 커피를 마시는 것이 아니라, 강릉의 역사와 문화를 느끼고, 바다의 고요함과 함께 여유를 즐길 수 있다. 향긋한 커피 한 잔과 함께 강릉의 푸른 바다를 바라보는 순간, 일상의 스트레스는 사라지고 깊은 휴식을 느낄 수 있다. 이곳은 단순한 관광지가 아닌, 커피와 바다가 만들어낸 특별한 공간으로서 방문객들의 발길을 끊임없이 끌어당기고 있다.

강릉 커피거리의 이야기를 담은 커피 한 잔을 들고, 바다의 소리를 들으며, 이곳의 독특한 정취를 느껴보는 것은 어떨까? 한 번의 방문만으로도 강릉과 커피거리에 대한 특별한 기억이 오래도록 마음속에 남을 것이다.</p>
            </div>

            <div className='beans_header'>
                <hr />
                <h1>Beans</h1>
            </div>
            <div className='beans_info'>
                <div className='beans_type'>
                    <h2>아라비카</h2>
                    <h3>|</h3>
                    <p id='beans_type_p'>아라비카 원두는 전 세계적으로 가장 일반적으로 소비되는 커피 원두입니다. 아라비카 커피 원두를 에스프레소로 마시면 약간 달콤하고 신맛이 나는 온화하고 섬세한 맛이 있습니다. 아라비카 원두는 향이 좋은 특성 때문에 종종 선호됩니다.</p>
                </div>
                <div className='beans_type'>
                    <h2>로부스타</h2>
                    <h3>|</h3>
                    <p id='beans_type_p'>로부스타 원두는 아라비카 원두에 비해 더 강하고 쓴 맛이 있습니다. 더 높은 카페인 함량을 함유하고 있으며 흙내음과 견과류 맛으로 유명합니다. 로부스타 원두는 풍부하고 풀바디한 풍미를 제공하기 위해 에스프레소 블렌드에 자주 사용됩니다.</p>
                </div>
                <div className='beans_type'>
                    <h2>리버스카</h2>
                    <h3>|</h3>
                    <p id='beans_type_p'>리버스카 원두는 강한 초콜릿 향과 묵직한 풍미를 가진 원두로, 주로 고지대에서 재배됩니다. 리버스카 커피는 쌉싸름한 뒷맛과 함께 다채로운 향미를 자랑하며 부드러운 텍스처가 특징입니다. 특히 크레마 형성이 좋아, 에스프레소에 적합하며 라떼나 카푸치노 같은 밀크 베이스 커피에도 잘 어울립니다.</p>
                </div>
                <div className='beans_type'>
                    <h2>카투라</h2>
                    <h3>|</h3>
                    <p id='beans_type_p'>카투라 원두는 아라비카의 한 품종으로, 풍부한 산미와 균형 잡힌 단맛이 특징입니다. 이 원두는 잘 익은 과일과 시트러스 노트를 가지고 있으며, 브라질과 콜롬비아와 같은 남미 지역에서 많이 재배됩니다. 카투라 커피는 부드러우면서도 다채로운 맛의 조화를 이루며, 드립 커피나 핸드드립 방식으로 추출했을 때 그 풍미가 더욱 돋보입니다.</p>
                </div>
            </div>
            <div className='coffee_brewing'>
            <h2>커피 추출 방법</h2>
            <img src="images/coffee.png" className='coffee_img' alt="Coffee street"></img>
                <div className='brewing_methods'>
                    <div className='method'>
                        <h3>핸드드립</h3>
                        <p> 핸드드립은 뜨거운 물을 일정하게 부어 커피를 추출하는 방식으로, 커피의 섬세한 맛과 향을 강조합니다. 
                        주로 원두 본연의 맛을 즐기고자 할 때 적합하며,추출 과정에서의 물의 온도와 속도를 조절할 수 있어 다양한 풍미를 느낄 수 있습니다.</p>
                    </div>
                    <div className='method'>
                        <h3>에스프레소</h3>
                        <p>고압을 이용해 빠르게 커피를 추출하는 방식으로, 진하고 강한 풍미를 제공합니다. 
                        에스프레소는 라떼, 아메리카노, 카푸치노 등 다양한 커피 음료의 베이스로 사용되며, 크레마라 불리는 부드러운 거품 층이 특징입니다.</p>
                    </div>
                    <div className='method'>
                        <h3>프렌치프레스</h3>
                        <p>굵게 간 원두를 뜨거운 물에 담근 후 플런저를 눌러 추출하는 방식으로, 깊고 풍부한 맛을 제공합니다. 
                        커피의 오일 성분과 미세한 입자가 그대로 남아있어 진한 풍미를 즐길 수 있으며, 간단한 도구로 커피를 추출할 수 있어 인기가 많습니다.</p>
                    </div>
                </div>
            </div>


        </div>
    );
}
