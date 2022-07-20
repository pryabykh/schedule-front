import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAll } from '../../../services/ClassroomService/FetchAllClassroomService';
import style from './classroom-page.module.css';
import cn from 'classnames';
import { SORT_BY_NEW_ITEM, SORT_BY_OLD_ITEM } from '../../../const/interface';

function SortByIdComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sizeOfPage = useSelector((state) => state.rootReducer.classroomPageReducer['sizeOfPage']);
    const lastPageSizeRequest = useSelector((state) => state.rootReducer.classroomPageReducer['pageSizeRequest']);

    const sortByNewActive = lastPageSizeRequest.sortDirection === "desc" && lastPageSizeRequest.sortBy === "id"
    const sortByOldActive = lastPageSizeRequest.sortDirection === "asc" && lastPageSizeRequest.sortBy === "id"

    const sortBy = (sortDirection) => (event) => {
        const pageSize = {
            ...lastPageSizeRequest,
            "page": 0,
            "size": sizeOfPage,
            "sortBy": "id",
            "sortDirection": sortDirection
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    return (
        <>
            <div className={cn(style['sort-by-id-button-container'])}>
                <div className={cn(style['sort-by-id-button-new'], style['cursor-pointer'], { [style['sort-by-id-button-active']]: sortByNewActive })}
                    onClick={sortBy("desc")}
                >
                    {SORT_BY_NEW_ITEM}
                </div>
                <div className={cn(style['sort-by-id-button-old'], style['cursor-pointer'], { [style['sort-by-id-button-active']]: sortByOldActive })}
                    onClick={sortBy("asc")}
                >
                    {SORT_BY_OLD_ITEM}
                </div>
            </div>
        </>
    );
}

export default SortByIdComponent;