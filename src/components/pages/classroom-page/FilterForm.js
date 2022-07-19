import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INPUT_MAX_LENGTH } from '../../../const/inputs';
import { CLASSROOM_CAPACITY_TABLE_HEADER, CLASSROOM_DESCRIPTION_TABLE_HEADER, CLASSROOM_IN_CHARGE_TABLE_HEADER, CLASSROOM_NUMBER_TABLE_HEADER, FILTER_CRITERIA_OR_FILTER_VALUE_IS_EMPTY_MESSAGE } from '../../../const/interface';
import { fetchAll } from '../../../services/ClassroomService/FetchAllClassroomService';
import cn from 'classnames'
import style from './classroom-page.module.css'

function FilterForm() {

    const [filterBy, setFilterBy] = useState();
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sizeOfPage = useSelector((state) => state.rootReducer.classroomPageReducer['sizeOfPage']);
    const lastPageSizeRequest = useSelector((state) => state.rootReducer.classroomPageReducer['pageSizeRequest']);

    const filterCriterias = [
        {
            key: 1,
            view: CLASSROOM_NUMBER_TABLE_HEADER,
            filterId: "number"
        },
        {
            key: 2,
            view: CLASSROOM_CAPACITY_TABLE_HEADER,
            filterId: "capacity"
        },
        {
            key: 3,
            view: CLASSROOM_DESCRIPTION_TABLE_HEADER,
            filterId: "description"
        },
        {
            key: 4,
            view: CLASSROOM_IN_CHARGE_TABLE_HEADER,
            filterId: "incharge"
        }
    ]

    const chooseFilterBy = (filterId) => (e) => {
        setFilterBy(filterId)
    };

    const clearFilter = (e) => {
        setFilterBy(undefined)
        setInputValue("")
        const pageSize = {
            ...lastPageSizeRequest,
            page: 0,
            pageSize: sizeOfPage,
            filterBy: undefined,
            filterValue: undefined
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    const onChange = (e) => {
        if (e.target.value.length > INPUT_MAX_LENGTH) return; //!!!
        setInputValue(e.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!filterBy || inputValue === "") {
            alert(FILTER_CRITERIA_OR_FILTER_VALUE_IS_EMPTY_MESSAGE)
            return;
        }
        const pageSize = {
            ...lastPageSizeRequest,
            page: 0,
            pageSize: sizeOfPage,
            filterBy: filterBy,
            filterValue: inputValue
        }
        fetchAll(pageSize, navigate, dispatch)
    }

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className="input-group mb-3">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {!filterBy ? "Поле для фильтрации" : filterCriterias.filter(criteria => criteria.filterId === filterBy)[0].view}
                </button>
                <ul className="dropdown-menu">
                    {filterCriterias.map((filterCriteria) => (
                        <li onClick={chooseFilterBy(filterCriteria.filterId)} key={filterCriteria.key}>
                            <div className={cn('dropdown-item', style['cursor-pointer'])}>{filterCriteria.view}</div>
                        </li>
                    ))}
                    <li><hr className="dropdown-divider" /></li>
                    <li onClick={clearFilter}><div className={cn('dropdown-item', style['cursor-pointer'])}>Очистить фильтр</div></li>
                </ul>
                <input onChange={onChange} value={inputValue} type="text" className="form-control" />
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Поиск</button>
            </div>
        </form>
    );
}

export default FilterForm;