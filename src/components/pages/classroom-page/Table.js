import React from 'react';
import { useSelector } from 'react-redux';
import { CLASSROOM_CAPACITY_TABLE_HEADER, CLASSROOM_DESCRIPTION_TABLE_HEADER, CLASSROOM_IN_CHARGE_TABLE_HEADER, CLASSROOM_NUMBER_TABLE_HEADER, LIST_OF_DATA_IS_EMPTY_FOR_TABLE_MESSAGE } from '../../../const/interface';

function Table() {
    const classrooms = useSelector((state) => state.rootReducer.classroomPageReducer['classrooms']);

    return (
        <>
            {classrooms.length === 0 && (<b> {LIST_OF_DATA_IS_EMPTY_FOR_TABLE_MESSAGE} </b>)}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">{CLASSROOM_NUMBER_TABLE_HEADER}</th>
                        <th scope="col">{CLASSROOM_CAPACITY_TABLE_HEADER}</th>
                        <th scope="col">{CLASSROOM_DESCRIPTION_TABLE_HEADER}</th>
                        <th scope="col">{CLASSROOM_IN_CHARGE_TABLE_HEADER}</th>
                    </tr>
                </thead>
                <tbody>
                    {classrooms.map((classroom) => (
                        <tr key={classroom.id}>
                            <th scope="row">{classroom.number}</th>
                            <td>{classroom.capacity}</td>
                            <td>{classroom.description}</td>
                            <td>{classroom.inCharge === null ? "-" :
                                classroom.inCharge.lastName + " " +
                                classroom.inCharge.firstName + " " +
                                classroom.inCharge.patronymic}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;