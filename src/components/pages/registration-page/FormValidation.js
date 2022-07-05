import { EMAIL_INPUT_NAME, FIRST_NAME_INPUT_NAME, LAST_NAME_INPUT_NAME, PASSWORD_INPUT_NAME } from "../../../const/interface";
import { ON_CHANGE } from "../../../const/validation";
import { setInputInvalid, setInputValid } from "../../../store/registrationPageSlice";

export const validate = (inputName, inputValue, dispatch, inputWasFocused, inputWasValid, action) => {
    if((!inputWasFocused || inputWasValid) && action === ON_CHANGE) {
        return;
    }
    switch(inputName) {
        case FIRST_NAME_INPUT_NAME: {
            if(inputValue.length < 1) dispatch(setInputInvalid(inputName))
            else dispatch(setInputValid(inputName))
            break
        }
        case LAST_NAME_INPUT_NAME: {
            if(inputValue.length < 1) dispatch(setInputInvalid(inputName))
            else dispatch(setInputValid(inputName))
            break
        }
        case EMAIL_INPUT_NAME: {
            if(!inputValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) dispatch(setInputInvalid(inputName))
            else dispatch(setInputValid(inputName))
            break
        }
        case PASSWORD_INPUT_NAME: {
            if(inputValue.length < 6) dispatch(setInputInvalid(inputName))
            else dispatch(setInputValid(inputName))
            break
        }
        default: {
            break
        }
    }
}