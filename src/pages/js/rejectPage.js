import React from 'react';
import { useParams } from 'react-router-dom';

function RejectPage() {
  const { userId, groupName } = useParams();

  const handleReject = async () => {
    alert(`${groupName}의 가입 신청이 거부되었습니다.`);
    // 추가적인 로직이 필요하다면 여기에 작성.
  };

  return (
    <div>
      <h1>가입 신청 거부</h1>
      <p>{groupName} 모임의 가입 신청을 거부하시겠습니까?</p>
      <button onClick={handleReject}>거부 확인</button>
    </div>
  );
}

export default RejectPage;
