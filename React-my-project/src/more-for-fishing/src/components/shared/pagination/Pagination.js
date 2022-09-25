import { Link } from 'react-router-dom';
import React from 'react';

export const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link onClick={() => paginate(number)} to="" className="page-link">
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
