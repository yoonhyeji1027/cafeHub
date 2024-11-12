import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/matchingCafe.css"; 

const Card = ({ cafes }) => {
    const navigate = useNavigate(); 

    const title = cafes?.title || '제목 없음';
    const imageUrl = cafes?.image_url || 'default_image_url.jpg'; 
    const address = cafes?.address || '주소 정보 없음';

    const handleClick = () => {
        navigate('/matchingSignUp', { state: { cafe: cafes } });  // navigate로 state를 전달
    };

    return (
        <div className="card" onClick={handleClick}> 
            <h3 className="title">{title}</h3>
            <img src={imageUrl} alt={title} className="cafe-image" />
            <p className="address">{address}</p>
        </div>
    );
};

export default Card;
