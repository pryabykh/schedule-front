import React from 'react'
import cn from 'classnames';
import style from "./input.module.css"

function FormInput({ id, name, type, label, value, valid, invalidText, focused, onChange, onBlur }) {
    const inputClassNames = cn('form-control', style.input, {
        [style['input-invalid']]: (!valid && focused)
    })

    const invalidTextClassNames = cn('form-text', {
        [style['show-invalid-text']]: (!valid && focused),
        [style['hide-invalid-text']]: !(!valid && focused)
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
            {(!valid && focused) && (
                <div className={invalidTextClassNames}>{invalidText}</div>
            )}

        </div>
    );
}

export default FormInput;