import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './classroom-page.module.css'
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_SIZE_OF_PAGE } from '../../../const/pagination';
import { fetchAll } from '../../../services/ClassroomService/FetchAllClassroomService';

function Pagination() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const totalElements = useSelector((state) => state.rootReducer.classroomPageReducer['totalElements']);
    const totalPages = useSelector((state) => state.rootReducer.classroomPageReducer['totalPages']);
    const currentPage = useSelector((state) => state.rootReducer.classroomPageReducer['currentPage']);
    const lastPageSizeRequest = useSelector((state) => state.rootReducer.classroomPageReducer['pageSizeRequest']);

    const pages = []
    for (let i = 0; i < totalPages; i++) {
        pages[i] = {
            viewNumber: i + 1,
            pageNumber: i,
            active: currentPage === i
        }
    }
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    const goToPage = (page) => (event) => {
        const pageSize = {
            ...lastPageSizeRequest,
            page: page,
            pageSize: DEFAULT_SIZE_OF_PAGE
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    const goToPreviousPage = (event) => {
        if(isFirstPage) return;
        const pageSize = {
            ...lastPageSizeRequest,
            page: currentPage - 1,
            pageSize: DEFAULT_SIZE_OF_PAGE
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    const goToNextPage = (event) => {
        if(isLastPage) return;
        const pageSize = {
            ...lastPageSizeRequest,
            page: currentPage + 1,
            pageSize: DEFAULT_SIZE_OF_PAGE
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    return (
        <>
            <nav>
                <ul className="pagination justify-content-center">
                    <li onClick={goToPreviousPage} className="page-item">
                        <a className={`page-link ${isFirstPage ? 'disabled' : ''}`} href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pages.map((page) => (
                        <li key={page.viewNumber} onClick={goToPage(page.pageNumber)} className={`page-item ${page.active ? 'active' : ''}`}>
                            <a className="page-link" href="#">{page.viewNumber}</a>
                        </li>
                    ))}
                    <li onClick={goToNextPage} className="page-item">
                        <a className={`page-link ${isLastPage ? 'disabled' : ''}`} href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Pagination;