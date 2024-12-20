import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav_login from './nav_login.js';
import { supabase } from '../../utils/SupabaseClient.ts';
import emailjs from 'emailjs-com';
import '../css/groupDetail.css';

function getSession() {
  const session = JSON.parse(localStorage.getItem('session'));
  return session;
}

function GroupDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const [groupDetails, setGroupDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setIsLoggedIn(true); // 세션이 있으면 로그인 상태로 설정
    }
  }, []);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (item && item.group_name) {
        const { data, error } = await supabase
          .from('group')
          .select('number, user_id, member_cnt, purpose, promotion')
          .eq('group_name', item.group_name);

        if (error) {
          console.error('Error fetching group details:', error);
        } else if (data && data.length > 0) {
          setGroupDetails(data[0]);
        }
      }
    };

    fetchGroupDetails();
  }, [item]);

  if (!item) {
    return <div className="error-message">데이터가 없습니다.</div>;
  }

  const handleCancel = () => {
    navigate('/group.js');
  };

  const handleApply = async () => {
    const session = getSession();
    if (!session || !session.user_id || !session.email || !session.name) {
      alert('세션 정보가 부족합니다. 로그인 상태를 확인해주세요.');
      return;
    }

    const confirmed = window.confirm('해당 모임에 가입을 신청하시겠습니까?');
    if (confirmed) {
      const templateParams = {
        group_name: item.group_name,
        group_user_name: item.name,
        name: session.name,
        user_email: session.email,
        phone_number: session.phone_number,
        message: `${item.group_name} 모임에 새로운 가입 신청이 들어왔습니다.`,
        user_id: session.user_id,
      };

      try {
        // 이메일 전송
        await emailjs.send(
          'service_ju8jhjk',
          'template_m87wdv8',
          templateParams,
          'Ve6bFjXhWRZ7xAshS'
        );


        // Supabase 테이블에 데이터 삽입
        const { error } = await supabase.from('group_applications').insert([
          {
            name: session.name,
            user_id: session.user_id,
            group_name: item.group_name,
            email: session.email,
            group_user_name: item.name,
          },
        ]);

        if (error) {
          console.error('가입 신청 정보를 저장하는 중 오류 발생:', error);
          alert('가입 신청 데이터를 저장하지 못했습니다. 다시 시도해주세요.');
        } else {
          alert('가입 신청이 정상적으로 처리되었습니다.');
        }
      } catch (error) {
        console.error('가입 신청 처리 중 문제가 발생했습니다:', error);
        alert('가입 신청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div>
      <Nav_login />
      <div className="group-detail-container">
        <div className="group-detail-content">
          <h1 className="group-title">모임 상세정보</h1>
          <div className="group-basic-info">
            <p><strong>모임명:</strong> {item.group_name}</p>
            <p><strong>등록일:</strong> {item.created_at}</p>
            <p><strong>모임장:</strong> {item.name}</p>
          </div>

          {groupDetails ? (
            <div className="group-extra-info">
              <p><strong>번호 (ID):</strong> {groupDetails.number}</p>
              <p><strong>회원 수:</strong> {groupDetails.member_cnt}</p>
              <p><strong>목적:</strong> {groupDetails.purpose}</p>
              <p><strong>홍보 내용:</strong> {groupDetails.promotion}</p>
              <p><strong>모임 관리자 ID:</strong> {groupDetails.user_id}</p>
            </div>
          ) : (
            <p className="loading-message">추가 데이터를 불러오는 중입니다...</p>
          )}

          <div className="group-actions">
            <button className="apply-button" onClick={handleApply}>모임 가입 신청</button>
            <button className="cancel-button" onClick={handleCancel}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
