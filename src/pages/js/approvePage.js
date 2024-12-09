import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../utils/SupabaseClient.ts';

function ApprovePage() {
  const { name, user_id, email, group_name } = useParams();

  useEffect(() => {
    // URL 파라미터 디버깅
    console.log('Params:', { name, user_id, email, group_name });

    // 파라미터 유효성 검사
    if (!name || !user_id || !email || !group_name) {
      console.error('Invalid parameters:', { name, user_id, email, group_name });
      alert('URL 파라미터가 유효하지 않습니다.');
      return;
    }

    const fetchUserAndApprove = async () => {
      // Supabase 유저 조회
      const { data: userData, error: userError } = await supabase
        .from('cafehub_user')
        .select('*')
        .match({ name, user_id, email });

      if (userError) {
        console.error('유저 조회 중 오류:', userError);
        alert('유저 조회 중 문제가 발생했습니다.');
        return;
      }

      if (!userData || userData.length === 0) {
        console.error('유저 조회 오류: 데이터가 없습니다.');
        alert('가입 신청 유저 정보를 찾을 수 없습니다.');
        return;
      }

      console.log('유저 조회 성공:', userData);

      // 그룹 가입 승인 처리
      const { error: approvalError } = await supabase
        .from('group_membership')
        .insert([{ group_name, user_id }]);

      if (approvalError) {
        console.error('가입 승인 오류:', approvalError);
        alert('가입 승인 처리 중 문제가 발생했습니다.');
      } else {
        alert('가입 신청이 승인되었습니다.');
      }
    };

    fetchUserAndApprove();
  }, [name, user_id, email, group_name]);

  return <div>가입 신청 승인 처리 중...</div>;
}

export default ApprovePage;
