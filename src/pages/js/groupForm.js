import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../css/groupForm.css";
import Nav from './nav.js';
import Nav_login from './nav_login.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function GroupForm() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [creationDate, setCreationDate] = useState('');
    const [groupName, setGroupName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [promotion, setPromotion] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('session'));
        if (session) {
            setIsLoggedIn(true); 
            setUserId(session.user_id); 
            fetchUserName(session.user_id); 
        }

        // 현재 날짜 설정
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCreationDate(formattedDate);
    }, []);

    // 사용자 이름 가져오기 함수
    const fetchUserName = async (user_id) => {
        try {
            const { data, error } = await supabase
                .from('cafehub_user')
                .select('name')
                .eq('user_id', user_id)
                .single(); // 단일 사용자 정보 가져오기

            if (error) throw new Error(`Error fetching user name: ${error.message}`);
            if (!data) {
                console.log('No user found with this user_id:', user_id);
                return;
            }

            setUserName(data.name); // 사용자 이름 설정
        } catch (err) {
            console.error(err);
        }
    };

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !userName) {
            alert('로그인 정보가 없습니다.');
            return;
        }

        // 데이터 전송
        const { data, error } = await supabase
            .from('group')
            .insert([{
                group_name: groupName,
                created_at: creationDate,
                purpose: purpose,
                promotion: promotion,
                user_id: userId,
                name: userName
            }]);

        if (error) {
            console.error('Error creating group:', error.message);
            alert("모임 생성에 실패했습니다.");
        } else {
            console.log('Group created successfully:', data);
            alert("모임이 생성되었습니다.");

            navigate('/group.js');
        }
    };

    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}

            <div className="group-form-container">
                <h2>모임 생성</h2>
                <form onSubmit={handleSubmit}>
                    <div className="groupForm_list">
                        <label htmlFor="groupName">모임명</label>
                        <input
                            type="text"
                            id="groupName"
                            placeholder="모임명을 입력하세요"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <div className="groupForm_list">
                        <label htmlFor="groupDate">생성일</label>
                        <div className="groupCreationDate">{creationDate}</div>
                    </div>
                    <div className="groupForm_list">
                        <label htmlFor="groupPurpose">모임목적</label>
                        <input
                            type="text"
                            id="groupPurpose"
                            placeholder="모임 목적을 입력하세요"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                    </div>
                    <div className="groupForm_list">
                        <label htmlFor="groupPromotion">홍보문구</label>
                        <input
                            type="text"
                            id="groupPromotion"
                            placeholder="문구를 입력하세요"
                            value={promotion}
                            onChange={(e) => setPromotion(e.target.value)}
                        />
                    </div>
                    <div className="groupForm_bt">
                        <Link to="/group.js">
                            <button type="button" className="cancelBt">취소</button>
                        </Link>
                        <button type="submit" className="applicationBt">생성</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
