import { CLASSROOM_CAPACITY_INPUT_NAME_CREATE, CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE, CLASSROOM_NUMBER_INPUT_NAME_CREATE } from "../../../const/inputs";
import { ON_BLUR, ON_CHANGE } from "../../../const/validation";
import { hideValidationError, setInputInvalid, setInputValid, setInputWasFocused, showValidationError } from "../../../store/ClassroomPageSlice";

export const validate = (inputName, inputValue, dispatch, inputWasFocused, inputWasValid, action) => {
    let currentInputIsValid = false;
    switch(inputName) {
        case CLASSROOM_NUMBER_INPUT_NAME_CREATE: {
            if(inputValue.length < 1) {
                dispatch(setInputInvalid(inputName))
            }else {
                dispatch(setInputValid(inputName))
                dispatch(hideValidationError(inputName))
                currentInputIsValid = true;
            }
            break
        }
        case CLASSROOM_CAPACITY_INPUT_NAME_CREATE: {
            if(!inputValue.match(/^[0-9]+$/) || inputValue < 1) {
                dispatch(setInputInvalid(inputName))
            }else {
                dispatch(setInputValid(inputName))
                dispatch(hideValidationError(inputName))
                currentInputIsValid = true;
            }
            break
        }
        case CLASSROOM_DESCRIPTION_INPUT_NAME_CREATE: {
            if(inputValue.length < 1) {
                dispatch(setInputInvalid(inputName))
            }else {
                dispatch(setInputValid(inputName))
                dispatch(hideValidationError(inputName))
                currentInputIsValid = true;
            }
            break
        }
        default: {
            break
        }
    }
    if(action === ON_BLUR) {
        dispatch(setInputWasFocused(inputName))
    }
    if((!((!inputWasFocused || inputWasValid) && action === ON_CHANGE)) && !currentInputIsValid) {
        dispatch(showValidationError(inputName))
    }
}