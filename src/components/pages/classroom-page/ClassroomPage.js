import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_SIZE_OF_PAGE } from '../../../const/pagination';
import { fetchAll } from '../../../services/ClassroomService/FetchAllClassroomService';
import { showCreateModal } from '../../../store/ClassroomPageSlice';
import Header from '../../shared/Header/Header';
import Loader from '../../shared/Loader/Loader';
import CreateModal from '../../shared/Modal/CreateModal';
import CreateForm from './CreateForm';
import FilterForm from './FilterForm';
import Pagination from './Pagination';
import SortByIdComponent from './SortByIdComponent';
import Table from './Table';

function ClassroomPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sizeOfPage = useSelector((state) => state.rootReducer.classroomPageReducer['sizeOfPage']);
  const shouldShowCreateModal = useSelector((state) => state.rootReducer.classroomPageReducer['showCreateModal']);

  useEffect(() => {
    const pageSize = {
      "page": 0,
      "size": sizeOfPage,
      "sortBy": "id",
      "sortDirection": "desc"
    }
    fetchAll(pageSize, navigate, dispatch)
  }, []);

  const create = () => {
    dispatch(showCreateModal())
  }


    return (
        <>
        <Loader />
        {shouldShowCreateModal && <CreateModal><CreateForm /></CreateModal>}
        <Header />
        <div className='container'>
        <h1 className='mt-2 mb-2'>Кабинеты</h1>
        <button onClick={create} type="button" className="btn btn-success mt-2 mb-3">Добавить</button>
        <FilterForm />
        <SortByIdComponent />
        <Table />
        <Pagination />
        </div>
        
        </>
    );
}

export default ClassroomPage;