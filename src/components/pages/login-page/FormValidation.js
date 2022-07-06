import { EMAIL_INPUT_NAME, PASSWORD_INPUT_NAME } from '../../../const/inputs'
import { ON_BLUR, ON_CHANGE } from "../../../const/validation";
import { hideValidationError, setInputInvalid, setInputValid, setInputWasFocused, showValidationError } from "../../../store/loginPageSlice";

export const validate = (inputName, inputValue, dispatch, inputWasFocused, inputWasValid, action) => {
    let currentInputIsValid = false;
    switch(inputName) {
        case EMAIL_INPUT_NAME: {
            if(!inputValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                dispatch(setInputInvalid(inputName))
            }else {
                dispatch(setInputValid(inputName))
                dispatch(hideValidationError(inputName))
                currentInputIsValid = true;
            }
            break
        }
        case PASSWORD_INPUT_NAME: {
            if(inputValue.length < 6) {
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