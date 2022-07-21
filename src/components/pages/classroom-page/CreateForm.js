import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './classroom-page.module.css';
import cn from 'classnames';
import FormInput from '../../shared/FormInput/FormInput';
import { CLASSROOM_CAPACITY_INPUT_NAME_CREATE, CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE, CLASSROOM_NUMBER_INPUT_NAME_CREATE, CLASSROOM_TEACHER_INPUT_NAME_CREATE, INPUT_MAX_LENGTH } from '../../../const/inputs';
import { CLASSROOM_CAPACITY_INPUT_LABEL, CLASSROOM_CAPACITY_INVALID_INPUT_MESSAGE, CLASSROOM_DESCRIPTION_INPUT_LABEL, CLASSROOM_DESCRIPTION_INVALID_INPUT_MESSAGE, CLASSROOM_NUMBER_INPUT_LABEL, CLASSROOM_NUMBER_INVALID_INPUT_MESSAGE, CLASSROOM_TEACHER_INPUT_LABEL } from '../../../const/interface';
import { INPUT_FOCUSED, INPUT_SHOW_VALIDATION_ERROR, INPUT_VALID, ON_BLUR, ON_CHANGE } from '../../../const/validation';
import { validate } from './FormValidation';
import { create } from '../../../services/ClassroomService/CreateClassroomService';
import AlertWarning from '../../shared/Alerts/AlertWarning/AlertWarning';
import AlertDanger from '../../shared/Alerts/AlertDanger/AlertDanger';
import { hideCreateModal, resetCreateForm } from '../../../store/ClassroomPageSlice';
import { resetAlerts } from '../../../store/appSlice';

function CreateForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        number: "",
        capacity: "",
        description: "",
        teacher: ""
    });

    const lastPageSizeRequest = useSelector((state) => state.rootReducer.classroomPageReducer['pageSizeRequest']);

    const validationStatus = {
        numberInputValid: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_VALID]),
        numberInputFocused: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_FOCUSED]),
        numberInputShowValidationError: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_NUMBER_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR]),

        capacityInputValid: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_VALID]),
        capacityInputFocused: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_FOCUSED]),
        capacityInputShowValidationError: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_CAPACITY_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR]),

        descriptionInputValid: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_VALID]),
        descriptionInputFocused: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_FOCUSED]),
        descriptionInputShowValidationError: useSelector((state) => state.rootReducer.classroomPageReducer[CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE + INPUT_SHOW_VALIDATION_ERROR]),
    }

    const inputs = [
        {
            key: 1,
            id: CLASSROOM_NUMBER_INPUT_NAME_CREATE,
            name: CLASSROOM_NUMBER_INPUT_NAME_CREATE,
            label: CLASSROOM_NUMBER_INPUT_LABEL,
            type: "text",
            valid: validationStatus['numberInputValid'],
            focused: validationStatus['numberInputFocused'],
            invalidText: CLASSROOM_NUMBER_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['numberInputShowValidationError']
        },
        {
            key: 2,
            id: CLASSROOM_CAPACITY_INPUT_NAME_CREATE,
            name: CLASSROOM_CAPACITY_INPUT_NAME_CREATE,
            label: CLASSROOM_CAPACITY_INPUT_LABEL,
            type: "text",
            valid: validationStatus['capacityInputValid'],
            focused: validationStatus['capacityInputFocused'],
            invalidText: CLASSROOM_CAPACITY_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['capacityInputShowValidationError']
        },
        {
            key: 3,
            id: CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE,
            name: CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE,
            label: CLASSROOM_DESCRIPTION_INPUT_LABEL,
            type: "text",
            valid: validationStatus['descriptionInputValid'],
            focused: validationStatus['descriptionInputFocused'],
            invalidText: CLASSROOM_DESCRIPTION_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['descriptionInputShowValidationError']
        },
        {
            key: 4,
            id: CLASSROOM_TEACHER_INPUT_NAME_CREATE,
            name: CLASSROOM_TEACHER_INPUT_NAME_CREATE,
            label: CLASSROOM_TEACHER_INPUT_LABEL,
            type: "text",
            valid: true,
            focused: undefined,
            invalidText: "",
            showValidationError: undefined
        }
    ]

    const handleSubmit = event => {
        event.preventDefault()
        const classroom = {
            ...values
        }
        create(classroom, lastPageSizeRequest, navigate, dispatch);
    }

    const onChange = (e) => {
        if (e.target.value.length > INPUT_MAX_LENGTH) return; //!!!
        setValues({ ...values, [e.target.name]: e.target.value });
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
        dispatch(hideCreateModal())
        dispatch(resetCreateForm())
        dispatch(resetAlerts())
    }

    const formValid = validationStatus.descriptionInputValid && validationStatus.capacityInputValid && validationStatus.numberInputValid

    return (
        <>
            <AlertWarning />
            <AlertDanger />
            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    {inputs.map((input) => (
                        <FormInput {...input} value={values[input.name]} onChange={onChange} onBlur={onBlur} />
                    ))}
                    <button type="submit" className="btn btn-dark mt-2" disabled={!formValid}>Сохранить</button>
                    &#160;&#160;
                    <button onClick={cancel} type="button" className="btn btn-outline-dark mt-2">Отмена</button>
                </div>
            </form>
        </>
    );
}

export default CreateForm;