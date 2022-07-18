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
    const sizeOfPage = useSelector((state) => state.rootReducer.classroomPageReducer['sizeOfPage']);

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
            pageSize: sizeOfPage
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    const goToPreviousPage = (event) => {
        if (isFirstPage) return;
        const pageSize = {
            ...lastPageSizeRequest,
            page: currentPage - 1,
            pageSize: sizeOfPage
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    const goToNextPage = (event) => {
        if (isLastPage) return;
        const pageSize = {
            ...lastPageSizeRequest,
            page: currentPage + 1,
            pageSize: sizeOfPage
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    return (
        <>
            <nav>
                <ul className="pagination justify-content-center">
                    <li onClick={goToPreviousPage} className={cn('page-item', style['cursor-pointer'])}>
                        <div className={`page-link ${isFirstPage ? 'disabled' : ''}`} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </div>
                    </li>
                    {pages.map((page) => (
                        <li
                            key={page.viewNumber}
                            onClick={goToPage(page.pageNumber)}
                            className={`page-item ${page.active ? 'active' : ''} ${style['cursor-pointer']}`}>
                            <div className="page-link">{page.viewNumber}</div>
                        </li>
                    ))}
                    <li onClick={goToNextPage} className={cn('page-item', style['cursor-pointer'])}>
                        <div className={`page-link ${isLastPage ? 'disabled' : ''}`} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </div>
                    </li>
                </ul>

            </nav>
            <span><b>Всего: {totalElements}</b></span>
        </>
    );
}

export default Pagination;