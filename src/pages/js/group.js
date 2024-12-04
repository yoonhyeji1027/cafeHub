import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "../css/group.css";
import Nav from './nav.js';
import Voc from "./voc.js";
import Nav_login from './nav_login.js';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function Group() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [groups, setGroups] = useState([]); // 모임 데이터를 저장할 상태

    const navigate = useNavigate();

    // 페이지 로드 시 세션 확인
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
        }
    }, []);

    // 모임 데이터 가져오기
    useEffect(() => {
        const fetchGroups = async () => {
            const { data, error } = await supabase.from('group').select('id, group_name, created_at, name');
            if (error) {
                console.error('Error fetching groups:', error);
            } else {
                setGroups(data);
            }
        };

        fetchGroups();
    }, []);

    // 그룹 상세보기로 이동
    const handleGroupClick = (id) => {
        navigate(`/groupDetail/${id}`); // 클릭한 게시글의 id를 URL 파라미터로 전달
    };

    return (
        <div>
            {isLoggedIn ? <Nav_login /> : <Nav />}

            <div className='matching_bt'>
                <Link to="/group.js">
                    <button className='groupBt'>모임</button>
                </Link>
                <Link to="/matchingCafe.js">
                    <button className='matchingCafeBt'>매칭</button>
                </Link>
            </div>
            <div className='groupMenu_bt'>
                <Link to="/groupForm.js">
                    <button className='groupFormBt'>모임추가</button>
                </Link>
            </div>

            <div className="groupList">
                {groups.map((group) => (
                    <div 
                        key={group.id} 
                        className="groupCard" 
                        onClick={() => handleGroupClick(group.id)} // 클릭 이벤트 설정
                    >
                        <h3>{group.group_name}</h3>
                        <p>생성자: {group.name}</p>
                        <p>생성일: {new Date(group.created_at).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            <Voc />
        </div>
    );
}
