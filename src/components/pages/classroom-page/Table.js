import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLASSROOM_CAPACITY_TABLE_HEADER, CLASSROOM_DESCRIPTION_TABLE_HEADER, CLASSROOM_IN_CHARGE_TABLE_HEADER, CLASSROOM_NUMBER_TABLE_HEADER, CLASSROOM_SUBJECTS_TABLE_HEADER, LIST_OF_DATA_IS_EMPTY_FOR_TABLE_MESSAGE } from '../../../const/interface';
import { CLASSROOM_CAPACITY_SORT_FIELD_ID, CLASSROOM_DESCRIPTION_SORT_FIELD_ID, CLASSROOM_NUMBER_SORT_FIELD_ID, CLASSROOM_SUBJECTS_SORT_FIELD_ID, CLASSROOM_TEACHER_SORT_FIELD_ID } from '../../../const/system';
import { fetchAll } from '../../../services/ClassroomService/FetchAllClassroomService';
import { showUpdateModal } from '../../../store/ClassroomPageSlice';
import SortByAscItem from '../../shared/SortByAscItem';
import SortByDescItem from '../../shared/SortByDescItem';
import style from './classroom-page.module.css';

function Table() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sizeOfPage = useSelector((state) => state.rootReducer.classroomPageReducer['sizeOfPage']);
    const lastPageSizeRequest = useSelector((state) => state.rootReducer.classroomPageReducer['pageSizeRequest']);
    const classrooms = useSelector((state) => state.rootReducer.classroomPageReducer['classrooms']);

    const tableHeaders = [
        {
            key: 1,
            view: CLASSROOM_NUMBER_TABLE_HEADER,
            fieldId: CLASSROOM_NUMBER_SORT_FIELD_ID
        },
        {
            key: 2,
            view: CLASSROOM_CAPACITY_TABLE_HEADER,
            fieldId: CLASSROOM_CAPACITY_SORT_FIELD_ID
        },
        {
            key: 3,
            view: CLASSROOM_DESCRIPTION_TABLE_HEADER,
            fieldId: CLASSROOM_DESCRIPTION_SORT_FIELD_ID
        },
        {
            key: 4,
            view: CLASSROOM_IN_CHARGE_TABLE_HEADER,
            fieldId: CLASSROOM_TEACHER_SORT_FIELD_ID
        },
        {
            key: 5,
            view: CLASSROOM_SUBJECTS_TABLE_HEADER,
            fieldId: CLASSROOM_SUBJECTS_SORT_FIELD_ID
        },
    ]

    const sortBy = (field) => (event) => {
        if(field === CLASSROOM_SUBJECTS_SORT_FIELD_ID) {
            return;
        }
        let sortDirection = 'desc'
        if (lastPageSizeRequest.sortBy === field && lastPageSizeRequest.sortDirection === 'desc') {
            sortDirection = 'asc'
        }
        const pageSize = {
            ...lastPageSizeRequest,
            "page": 0,
            "size": sizeOfPage,
            "sortBy": field,
            "sortDirection": sortDirection
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    const openUpdateModal = (classroom) => (event) => {
        dispatch(showUpdateModal(classroom))
    }

    return (
        <>
            {classrooms.length === 0 && (<div className={style['data-is-empty-message']}><b> {LIST_OF_DATA_IS_EMPTY_FOR_TABLE_MESSAGE} </b></div>)}
            <table className="table">
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th
                                className={style['cursor-pointer']}
                                onClick={sortBy(header.fieldId)}
                                key={header.key}
                                scope="col">
                                {header.view}
                                {(lastPageSizeRequest.sortBy === header.fieldId && lastPageSizeRequest.sortDirection === 'desc') && <SortByDescItem />} 
                                {(lastPageSizeRequest.sortBy === header.fieldId && lastPageSizeRequest.sortDirection === 'asc') && <SortByAscItem />} 
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {classrooms.map((classroom) => (
                        <tr onClick={openUpdateModal(classroom)} className={style['cursor-pointer']} key={classroom.id}>
                            <th scope="row">{classroom.number}</th>
                            <td>{classroom.capacity}</td>
                            <td>{classroom.description}</td>
                            <td>{classroom.teacher === null ? "-" :
                                classroom.teacher.lastName + " " +
                                classroom.teacher.firstName + " " +
                                classroom.teacher.patronymic}
                            </td>
                            <td>{(classroom.subjects && classroom.subjects.length > 0) ? 
                            classroom.subjects.map((subject) => {
                                return subject.name
                            }).join(', ') : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;