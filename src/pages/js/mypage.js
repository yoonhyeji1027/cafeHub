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
        email: '',
        userId: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        const session = localStorage.getItem('session');
        const userId = localStorage.getItem('user_id');

        if (session && userId) {
            setIsLoggedIn(true);
            fetchUserInfo(userId);
            fetchGroupList(userId);
        } else {
            handleLogout(); // 세션이 없으면 초기화
        }
    }, []);

    const fetchUserInfo = async (userId) => {
        const { data, error } = await supabase
            .from('cafehub_user')
            .select('name, email, user_id')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error("Error fetching user info:", error);
        } else {
            setUserInfo({
                name: data.name,
                email: data.email,
                userId: data.user_id,
            });
        }
    };

    const fetchGroupList = async (userId) => {
        const { data, error } = await supabase
            .from('group')
            .select('group_name, created_at, name')
            .eq('user_id', userId);

        if (error) {
            console.error("Error fetching group list:", error);
        } else {
            setGroupList(data || []);
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
        const { userId, name, email } = userInfo;

        const { error } = await supabase
            .from('cafehub_user')
            .update({ name, email })
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
        setUserInfo({ name: '', email: '', userId: '' });
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
                                type="email"
                                className='userEmail'
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                                placeholder='이메일'
                            />
                            <div className="idCheck">
                                <div className='userIdLogin'>아이디: {userInfo.userId}</div>
                            </div>
                            <div className='userPassword'>비밀번호: ********</div>
                        </>
                    ) : (
                        <>
                            <div className='userName'>이름: {userInfo.name || "정보 없음"}</div>
                            <div className='userEmail'>이메일: {userInfo.email || "정보 없음"}</div>
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
                <div className='groupList'>
                    <h2>내가 속한 모임</h2>
                    {groupList.length > 0 ? (
                        <ul>
                            {groupList.map((group, index) => (
                                <li key={index}>
                                    <strong>{group.group_name}</strong> - 모임장: {group.name || "정보 없음"}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>속해 있는 모임이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
