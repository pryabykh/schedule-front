import React from 'react'
import cn from 'classnames';
import style from "./input.module.css"

function FormInput({ id, name, type, label, value, valid, invalidText, focused, showValidationError, onChange, onBlur }) {
    const inputClassNames = cn('form-control', style.input, {
        [style['input-invalid']]: (showValidationError && focused)
    })

    const invalidTextClassNames = cn('form-text', {
        [style['show-invalid-text']]: (showValidationError && focused),
        [style['hide-invalid-text']]: !(showValidationError && focused)
    })

    const labelClassNames = cn('form-label', style.label)
    return (
        <div className={style['input-container']}>
            <label htmlFor={id} className={labelClassNames}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                className={inputClassNames}
                id={id}
                name={name} />
            {(showValidationError && focused) && (
                <div className={invalidTextClassNames}>{invalidText}</div>
            )}

        </div>
    );
}

export default FormInput;