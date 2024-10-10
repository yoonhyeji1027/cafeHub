import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../css/mypage.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function Mypage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        phoneNumber: '',
        userId: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true);
            fetchUserInfo();
        } else {
            setIsLoggedIn(false);
            setUserInfo({
                name: '',
                phoneNumber: '',
                userId: '',
            });
        }
    }, []);

    const fetchUserInfo = async () => {
        const userId = localStorage.getItem('user_id'); // 현재 로그인된 사용자의 ID
        if (userId) {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('name, phone_number, user_id')
                .eq('user_id', userId)
                .single();

            if (error) {
                console.error("Error fetching user info:", error);
            } else {
                setUserInfo({
                    name: data.name,
                    phoneNumber: data.phone_number,
                    userId: data.user_id,
                });
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const { userId, name, phoneNumber } = userInfo;

        const { error } = await supabase
            .from('cafehub_user')
            .update({ name, phone_number: phoneNumber })
            .eq('user_id', userId);

        if (error) {
            console.error("Error updating user info:", error);
        } else {
            alert("사용자 정보가 성공적으로 업데이트되었습니다.");
            setIsEditing(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('session');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
        setUserInfo({ name: '', phoneNumber: '', userId: '' }); // 사용자 정보 초기화
    };

    return (
        <div>
            {isLoggedIn ? <Nav_login onLogout={handleLogout} /> : <Nav />}

            <div className="myPage_header">
                <h1 id='myPage_title'>마이페이지</h1>
                <hr />
            </div>
            <div>
                <div className='myPage_input'>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                className='userName'
                                name="name"
                                value={userInfo.name}
                                onChange={handleInputChange}
                                placeholder='이름'
                            />
                            <input
                                type="text"
                                className='userPhone'
                                name="phoneNumber"
                                value={userInfo.phoneNumber}
                                onChange={handleInputChange}
                                placeholder='전화번호'
                            />
                            <div className="idCheck">
                                <div className='userIdLogin'>아이디: {userInfo.userId}</div>
                            </div>
                            <div className='userPassword'>비밀번호: ********</div>
                        </>
                    ) : (
                        <>
                            <div className='userName'>이름: {userInfo.name || "정보 없음"}</div>
                            <div className='userPhone'>전화번호: {userInfo.phoneNumber || "정보 없음"}</div>
                            <div className="idCheck">
                                <div className='userIdLogin'>아이디: {userInfo.userId || "정보 없음"}</div>
                            </div>
                            <div className='userPassword'>비밀번호: ********</div>
                        </>
                    )}
                </div>
                <div className='myPage_bt'>
                    {isEditing ? (
                        <button id="myPageBt" onClick={handleUpdate}>수정 완료</button>
                    ) : (
                        <button id="myPageBt" onClick={() => setIsEditing(true)}>수정</button>
                    )}
                </div>
            </div>
        </div>
    );
}
