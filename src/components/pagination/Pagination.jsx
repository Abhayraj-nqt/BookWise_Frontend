import React from 'react';

// CSS
import './Pagination.css'

// Components
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage >= 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage+1 < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      {/* {currentPage && totalPages && onPageChange ?  */}
      
      <div className="pagination">
        {/* <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button> */}
        <div onClick={handlePrevious} className="pagination-icon-left icon">
          <MdChevronLeft size={25} />
        </div>
        
        <span>{`Page ${currentPage+1} of ${totalPages}`}</span>
        {/* <button onClick={handleNext} disabled={currentPage+1 === totalPages}>
          Next
        </button> */}
        <div onClick={handleNext} className="pagination-icon-right icon">
          <MdChevronRight size={25} />
        </div>
      </div> 
      
      {/* : undefined} */}
    </>
  );
};

export default Pagination;
