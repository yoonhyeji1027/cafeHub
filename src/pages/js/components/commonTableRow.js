import React from 'react';

function CommonTableRow({ children, onClick }) {
  return (
    <tr onClick={onClick} style={{ cursor: 'pointer' }}>
      {children}
    </tr>
  );
}

export default CommonTableRow;
