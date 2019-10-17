import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    const {onPageChange, itemsCount, pageSize, currentPage, totalPages } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if(pagesCount === 1) return null;
    var pages = _.range(1, pagesCount + 1);
    if(pagesCount > 10){
        var start = currentPage-1;
        if(currentPage < 5 && currentPage > 1){
            start = start -currentPage+1;
        }
        if(currentPage >= 5){
            start = start -4;
        }
        if(currentPage >= totalPages-5){
            start = (totalPages-10) ;
        }
        
        pages = _(pages).slice(start).take(10).value();
    }
    return (
        <nav>
            <ul className="pagination">
                {currentPage > 5 ? <li key="1" className="page-item"><button onClick={() => onPageChange(1)}  className="page-link">1...</button></li>:""}
                {pages.map(page =>
                    <li key={page} className={page === currentPage ? "page-item active" : "page-item"}><button onClick={() => onPageChange(page)}  className="page-link">{page}</button></li>
                )}
                {currentPage < totalPages-5 ? <li key={totalPages} className="page-item"><button onClick={() => onPageChange(totalPages)}  className="page-link">...{totalPages}</button></li>:""}
            </ul>
        </nav>
    );
}
 
export default Pagination;