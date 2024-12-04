import React, { useEffect, useState } from 'react';
import CommonTable from './components/commonTable.js';
import CommonTableColumn from './components/commonTableColumn.js';
import CommonTableRow from './components/commonTableRow.js';
import { supabase } from '../../utils/SupabaseClient.ts';
import { useNavigate } from 'react-router-dom';

function Voc() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupData = async () => {
      const { data, error } = await supabase
        .from('group')
        .select('group_name, created_at, name');

      if (error) {
        console.error('Error fetching group data:', error.message);
      } else {
        const formattedData = data
          .map(item => ({
            ...item,
            created_at: new Date(item.created_at).toISOString().split('T')[0],
          }))
          .reverse(); // 데이터 순서를 뒤집음
        setData(formattedData);
      }
    };

    fetchGroupData();
  }, []);

  const handleClick = (item) => {
    console.log('Navigating to groupDetail with data:', item); // 디버깅 로그
    navigate(`/groupDetail.js`, { state: { item } });
  };  

  return (
    <CommonTable headersName={['글번호', '모임명', '등록일', '모임장']}>
      {data.map((item, index) => (
        <CommonTableRow key={index} onClick={() => handleClick(item)}>
          <CommonTableColumn>{data.length - index}</CommonTableColumn>
          <CommonTableColumn>{item.group_name}</CommonTableColumn>
          <CommonTableColumn>{item.created_at}</CommonTableColumn>
          <CommonTableColumn>{item.name}</CommonTableColumn>
        </CommonTableRow>
      ))}
    </CommonTable>
  );
}

export default Voc;
