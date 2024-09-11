import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import CommonTable from './components/commonTable.js';
import CommonTableColumn from './components/commonTableColumn.js';
import CommonTableRow from './components/commonTableRow.js';

function GetData() {
  // 임시 데이터 설정
  const [data, setData] = useState([
    { id: 1, title: '모임 1', createAt: '2024-09-10', username: '모임장 1' },
    { id: 2, title: '모임 2', createAt: '2024-09-11', username: '모임장 2' },
    { id: 3, title: '모임 3', createAt: '2024-09-12', username: '모임장 3' },
  ]);

  useEffect(() => {
    // axios.get('http://127.0.0.1:8000/toyseven/voc').then((response)=> {
    //   setData(response.data);
    // })
  }, []);

  // 데이터를 렌더링하는 부분
  const item = data.map((item) => (
    <CommonTableRow key={item.id}>
      <CommonTableColumn>{item.id}</CommonTableColumn>
      <CommonTableColumn>{item.title}</CommonTableColumn>
      <CommonTableColumn>{item.createAt}</CommonTableColumn>
      <CommonTableColumn>{item.username}</CommonTableColumn>
    </CommonTableRow>
  ));

  return item;
}

function Voc() {
  const item = GetData();

  return (
    <>
      <CommonTable headersName={['글번호', '모임명', '등록일', '모임장']}>
        {item}
      </CommonTable>
    </>
  );
}

export default Voc;
