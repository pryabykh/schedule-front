import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAll } from '../../../services/ClassroomService/FetchAllClassroomService';
import Header from '../../shared/Header/Header';
import FilterForm from './FilterForm';

function ClassroomPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const pageSize = {
      "page": 0,
      "size": 5
    }
    fetchAll(pageSize, navigate, dispatch)
  }, []);


    return (
        <>
        <Header />
        <h1 className='container mt-2 mb-2'>Кабинеты</h1>
        <div className='container'>
        <button type="button" className="btn btn-success mt-2 mb-3">Добавить</button>
        <FilterForm />

        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

        </div>
        
        </>
    );
}

export default ClassroomPage;