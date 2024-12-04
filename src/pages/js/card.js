import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/matchingCafe.css"; 

const Card = ({ cafes }) => {
    const navigate = useNavigate(); 

    const name = cafes?.name || '제목 없음';
    const imageUrl = cafes?.image_url || 'default_image_url.jpg'; 
    const address = cafes?.address || '주소 정보 없음';



    const handleClick = () => {
        console.log("Navigating with cafe data:", cafes);  
        navigate('/matchingSignUp.js', { state: { cafe: cafes } });
    };

    return (
        <div className="card" onClick={handleClick}> 
            <h3 className="name">{name}</h3>
            <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "10px 0" }} />
            <img src={imageUrl} alt={name} className="cafe-image" />
            <p className="address">{address}</p>
        </div>
    );
};

export default Card;
