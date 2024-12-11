import React, { useEffect, useState } from 'react';
import CommonTable from './components/commonTable.js';
import CommonTableColumn from './components/commonTableColumn.js';
import CommonTableRow from './components/commonTableRow.js';
import { supabase } from '../../utils/SupabaseClient.ts';
import { useNavigate } from 'react-router-dom';

function Voc() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 표시할 항목 수
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

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <CommonTable headersName={['글번호', '모임명', '등록일', '모임장']}>
        {currentItems.map((item, index) => (
          <CommonTableRow key={index} onClick={() => handleClick(item)}>
            <CommonTableColumn>{data.length - (indexOfFirstItem + index)}</CommonTableColumn>
            <CommonTableColumn>{item.group_name}</CommonTableColumn>
            <CommonTableColumn>{item.created_at}</CommonTableColumn>
            <CommonTableColumn>{item.name}</CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>

      {/* 페이지네이션 버튼 */}
      <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage} 
        paginate={paginate} 
      />
    </div>
  );
}

function Pagination({ totalPages, currentPage, paginate }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>{'<<'}</button>
        </li>
        <li>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        <li>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
        </li>
        <li>
          <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
        </li>
      </ul>
    </nav>
  );
}

export default Voc;
