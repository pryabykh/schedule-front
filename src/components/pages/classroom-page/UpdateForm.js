import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './classroom-page.module.css';
import cn from 'classnames';
import FormInput from '../../shared/FormInput/FormInput';
import { CLASSROOM_CAPACITY_INPUT_NAME_UPDATE, CLASSROOM_DESCRIPTION_INPUT_NAME_UPDATE, CLASSROOM_NUMBER_INPUT_NAME_UPDATE, INPUT_MAX_LENGTH } from '../../../const/inputs';
import { CLASSROOM_CAPACITY_INPUT_LABEL, CLASSROOM_CAPACITY_INVALID_INPUT_MESSAGE, CLASSROOM_DESCRIPTION_INPUT_LABEL, CLASSROOM_DESCRIPTION_INVALID_INPUT_MESSAGE, CLASSROOM_NUMBER_INPUT_LABEL, CLASSROOM_NUMBER_INVALID_INPUT_MESSAGE, CLASSROOM_SUBJECTS_INPUT_LABEL, CLASSROOM_TEACHER_INPUT_LABEL } from '../../../const/interface';
import { INPUT_FOCUSED, INPUT_SHOW_VALIDATION_ERROR, INPUT_VALID, ON_BLUR, ON_CHANGE } from '../../../const/validation';
import { validate } from './UpdateFormValidation';
import { create } from '../../../services/ClassroomService/CreateClassroomService';
import AlertWarning from '../../shared/Alerts/AlertWarning/AlertWarning';
import AlertDanger from '../../shared/Alerts/AlertDanger/AlertDanger';
import { hideCreateModal, hideUpdateModal, resetCreateForm, resetUpdateForm, setChangedSubjects, setChangedTeachers, setTeachers } from '../../../store/ClassroomPageSlice';
import { resetAlerts } from '../../../store/appSlice';
import DataList from '../../shared/DataList/DataList';
import { fetchAllList as fetchAllTeachersList} from '../../../services/TeacherService/FetchAllListTeacherService';
import DataListMultiSelect from '../../shared/DataListMultiSelect/DataListMultiSelect';
import { fetchAllList as fetchAllSubjectsList } from '../../../services/SubjectService/FetchAllListSubjectService';
import { update } from '../../../services/ClassroomService/UpdateClassroomService';

function UpdateForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllTeachersList(navigate, dispatch)
        fetchAllSubjectsList(navigate, dispatch)
        
    }, []);

    const teachers = useSelector((state) => state.rootReducer.classroomPageReducer['teachers']);
    const changedTeachers = useSelector((state) => state.rootReducer.classroomPageReducer['changedTeachers']);
    const subjects = useSelector((state) => state.rootReducer.classroomPageReducer['subjects']);
    const changedSubjects = useSelector((state) => state.rootReducer.classroomPageReducer['changedSubjects']);

    const lastPageSizeRequest = useSelector((state) => state.rootReducer.classroomPageReducer['pageSizeRequest']);

    const classroomToUpdate = useSelector((state) => state.rootReducer.classroomPageReducer['classroomToUpdate']);

    const validationStatus = {
        numberInputValid: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_NUMBER_INPUT_NAME_UPDATE + INPUT_VALID]),
        numberInputFocused: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_NUMBER_INPUT_NAME_UPDATE + INPUT_FOCUSED]),
        numberInputShowValidationError: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_NUMBER_INPUT_NAME_UPDATE + INPUT_SHOW_VALIDATION_ERROR]),

        capacityInputValid: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_CAPACITY_INPUT_NAME_UPDATE + INPUT_VALID]),
        capacityInputFocused: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_CAPACITY_INPUT_NAME_UPDATE + INPUT_FOCUSED]),
        capacityInputShowValidationError: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_CAPACITY_INPUT_NAME_UPDATE + INPUT_SHOW_VALIDATION_ERROR]),

        descriptionInputValid: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_DESCRIPTION_INPUT_NAME_UPDATE + INPUT_VALID]),
        descriptionInputFocused: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_DESCRIPTION_INPUT_NAME_UPDATE + INPUT_FOCUSED]),
        descriptionInputShowValidationError: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_DESCRIPTION_INPUT_NAME_UPDATE + INPUT_SHOW_VALIDATION_ERROR]),
    }

    const [values, setValues] = useState({
        number: classroomToUpdate ? classroomToUpdate.number : "Тест",
        capacity: classroomToUpdate ? classroomToUpdate.capacity : "",
        description: classroomToUpdate ? classroomToUpdate.description : "",
        teacher: classroomToUpdate && classroomToUpdate.teacher ? classroomToUpdate.teacher.id : "",
        subjects: classroomToUpdate ? classroomToUpdate.subjects.map(subject => subject.id) : []
    });

    const inputs = [
        {
            key: 1,
            id: CLASSROOM_NUMBER_INPUT_NAME_UPDATE,
            name: CLASSROOM_NUMBER_INPUT_NAME_UPDATE,
            label: CLASSROOM_NUMBER_INPUT_LABEL,
            type: "text",
            valid: validationStatus['numberInputValid'],
            focused: validationStatus['numberInputFocused'],
            invalidText: CLASSROOM_NUMBER_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['numberInputShowValidationError']
        },
        {
            key: 2,
            id: CLASSROOM_CAPACITY_INPUT_NAME_UPDATE,
            name: CLASSROOM_CAPACITY_INPUT_NAME_UPDATE,
            label: CLASSROOM_CAPACITY_INPUT_LABEL,
            type: "text",
            valid: validationStatus['capacityInputValid'],
            focused: validationStatus['capacityInputFocused'],
            invalidText: CLASSROOM_CAPACITY_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['capacityInputShowValidationError']
        },
        {
            key: 3,
            id: CLASSROOM_DESCRIPTION_INPUT_NAME_UPDATE,
            name: CLASSROOM_DESCRIPTION_INPUT_NAME_UPDATE,
            label: CLASSROOM_DESCRIPTION_INPUT_LABEL,
            type: "text",
            valid: validationStatus['descriptionInputValid'],
            focused: validationStatus['descriptionInputFocused'],
            invalidText: CLASSROOM_DESCRIPTION_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['descriptionInputShowValidationError']
        }
    ]

    const handleSubmit = event => {
        event.preventDefault()
        const classroom = {
            ...values
        }
        update(classroomToUpdate.id, classroom, lastPageSizeRequest, navigate, dispatch);
    }

    const onChange = (e) => {
        if (e.target.value.length > INPUT_MAX_LENGTH) return; //!!!
        setValues({ ...values, [e.target.name.replace('Upd', '')]: e.target.value });
        const inputWasFocused = validationStatus[e.target.name + INPUT_FOCUSED]
        const inputWasValid = validationStatus[e.target.name + INPUT_VALID]
        validate(e.target.name, e.target.value, dispatch, inputWasFocused, inputWasValid, ON_CHANGE)
    };

    const onBlur = (e) => {
        const inputWasFocused = validationStatus[e.target.name + INPUT_FOCUSED]
        const inputWasValid = validationStatus[e.target.name + INPUT_VALID]
        validate(e.target.name, e.target.value, dispatch, inputWasFocused, inputWasValid, ON_BLUR)
    }

    const cancel = (e) => {
        dispatch(hideUpdateModal())
        dispatch(resetUpdateForm())
        dispatch(resetAlerts())
    }

    const dataListOnClick = (id) => (e) => {
        setValues({ ...values, teacher: id });
    }

    const dataListDeleteItem = (e) => {
        setValues({ ...values, teacher: "" });
    }

    const dataListMultiSelectOnClick = (id) => (e) => {
        setValues({ ...values, subjects: [...values.subjects, id] });
    }

    const dataListMultiSelectDeleteItem = (id) => (e) => {
        setValues({ ...values, subjects: values.subjects.filter(item => item !== id) })
    }

    const dispatchTeachersDataList = (teachers) => {
        dispatch(setChangedTeachers(teachers))
    }

    const dispatchSubjectsDataList = (subjects) => {
        dispatch(setChangedSubjects(subjects))
    }

    const formValid = validationStatus.descriptionInputValid && validationStatus.capacityInputValid && validationStatus.numberInputValid

    return (
        <>
            <AlertWarning />
            <AlertDanger />
            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    {inputs.map((input) => (
                        <FormInput {...input} value={values[input.name.replace('Upd', '')]} onChange={onChange} onBlur={onBlur} />
                    ))}
                    <DataList dispatchDataList={dispatchTeachersDataList} label={CLASSROOM_TEACHER_INPUT_LABEL} dataList={teachers} changedDataList={changedTeachers} dataListOnClick={dataListOnClick} dataListDeleteItem={dataListDeleteItem} defaultValue={classroomToUpdate && classroomToUpdate.teacher ? [classroomToUpdate.teacher.lastName, classroomToUpdate.teacher.firstName, classroomToUpdate.teacher.patronymic].join(' ') : ""}/>
                    <DataListMultiSelect dispatchDataList={dispatchSubjectsDataList} label={CLASSROOM_SUBJECTS_INPUT_LABEL} dataList={subjects} changedDataList={changedSubjects} dataListOnClick={dataListMultiSelectOnClick} dataListDeleteItem={dataListMultiSelectDeleteItem} defaultValues={classroomToUpdate.subjects.map(subject => ({id: subject.id, value: subject.name}))}/>
                    <button type="submit" className="btn btn-dark mt-2" disabled={!formValid}>Обновить</button>
                    &#160;&#160;
                    <button onClick={cancel} type="button" className="btn btn-outline-dark mt-2">Отмена</button>
                </div>
            </form>
        </>
    );
}

export default UpdateForm;