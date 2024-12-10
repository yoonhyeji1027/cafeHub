import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/SupabaseClient.ts';
import Nav from './nav.js';
import Nav_login from './nav_login.js';
import "../css/approvePage.css";

function ApprovePage() {
  const [applicants, setApplicants] = useState([]);
  const [checkedApplicants, setCheckedApplicants] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지 로드 시 세션 확인
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setIsLoggedIn(true); // 세션이 존재하면 로그인 상태로 설정
    }
  }, []);

  // 신청자 데이터 가져오기
  useEffect(() => {
    const fetchAllApplicants = async () => {
      const { data, error } = await supabase
        .from('group_applications')
        .select('*'); // 모든 데이터를 가져옵니다.

      if (error) {
        console.error('Error fetching all applicants:', error);
      } else {
        setApplicants(data);
      }
    };

    fetchAllApplicants();
  }, []);

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (id) => {
    setCheckedApplicants((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((applicantId) => applicantId !== id) // 이미 체크된 경우 해제
        : [...prevChecked, id] // 체크되지 않은 경우 추가
    );
  };

  // 신청 승인
  const approveApplicants = async () => {
    const selectedApplicants = applicants.filter((applicant) =>
      checkedApplicants.includes(applicant.id)
    );

    const insertData = selectedApplicants.map((applicant) => ({
      user_id: applicant.user_id,
      name: applicant.name,
      email: applicant.email,
      group_name: applicant.group_name,
      group_user_name: applicant.group_user_name,
    }));

    try {
      // 1. group_membership 테이블에 데이터 삽입
      const { error: insertError } = await supabase
        .from('group_membership')
        .insert(insertData);

      if (insertError) {
        console.error('Error approving applicants:', insertError);
        alert('승인 중 문제가 발생했습니다.');
        return;
      }

      // 2. group_applications 테이블에서 데이터 삭제
      const idsToDelete = selectedApplicants.map((applicant) => applicant.id);
      const { error: deleteError } = await supabase
        .from('group_applications')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) {
        console.error('Error deleting applicants:', deleteError);
        alert('데이터 삭제 중 문제가 발생했습니다.');
        return;
      }

      // 3. 상태 업데이트
      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => !idsToDelete.includes(applicant.id))
      );
      setCheckedApplicants([]); // 체크박스 초기화

      alert('선택된 신청자가 성공적으로 승인되었습니다!');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('예기치 못한 오류가 발생했습니다.');
    }
  };

  // 신청 거부
  const cancelApplicants = async () => {
    const selectedApplicants = applicants.filter((applicant) =>
      checkedApplicants.includes(applicant.id)
    );

    const idsToDelete = selectedApplicants.map((applicant) => applicant.id);

    try {
      // 1. group_applications 테이블에서 데이터 삭제
      const { error: deleteError } = await supabase
        .from('group_applications')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) {
        console.error('Error deleting applicants:', deleteError);
        alert('거부 중 문제가 발생했습니다.');
        return;
      }

      // 2. 상태 업데이트
      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => !idsToDelete.includes(applicant.id))
      );
      setCheckedApplicants([]); // 체크박스 초기화

      alert('선택된 신청자가 성공적으로 거부되었습니다!');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('예기치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {isLoggedIn ? <Nav_login /> : <Nav />}
      <div className='approve-page-container'>
        <h1 className="approve-page-title">가입 신청 목록</h1>
        {applicants.length > 0 ? (
          <table className="applicants-table">
            <thead>
              <tr>
                <th>선택</th>
                <th>이름</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>모임명</th>
                <th>신청자 ID</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedApplicants.includes(applicant.id)}
                      onChange={() => handleCheckboxChange(applicant.id)}
                    />
                  </td>
                  <td>{applicant.name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone_number}</td>
                  <td>{applicant.group_name}</td>
                  <td>{applicant.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="loading-message">가입 신청자가 없습니다.</p>
        )}
        <div className="button-container">
          <button className="button approve-button" onClick={approveApplicants}>
            승인
          </button>
          <button className="button cancel-button" onClick={cancelApplicants}>
            거부
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApprovePage;
