import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Nav_login from './nav_login.js';
import { supabase } from '../../utils/SupabaseClient.ts';
import '../css/groupDetail.css';

function GroupDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const [groupDetails, setGroupDetails] = useState(null);

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

  const handleApply = () => {
    const confirmed = window.confirm('해당 모임에 가입을 신청하시겠습니까?');
    if (confirmed) {
      // 가입 신청 처리 로직 추가
      console.log('가입 신청을 완료했습니다.');
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
