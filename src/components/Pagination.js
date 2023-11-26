import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ prevPage, changeCPage, nextPage, currentPage, numbers, npage }) => (
    <ul className="pagination justify-content-end mt-4">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} >
            <Link href="#" className="page-link" onClick={prevPage}
            >Prevent</Link>
        </li>

        {
            numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <Link href="#" className="page-link" onClick={() => changeCPage(n)}>{n}</Link>
                </li>
            )
            )
        }
        <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
            <Link href="#" className="page-link"
                onClick={nextPage} >Next</Link>
        </li>
    </ul>
)

export default Pagination;
