import React, { useState } from 'react'
import cn from 'classnames';
import style from "./data-list-multi-select.module.css"

function DataListMultiSelect({ id, label, dataList, changedDataList, dataListOnClick, dataListDeleteItem, defaultValues, dispatchDataList, valid, invalidText, focused, showValidationError, onChange, onBlur }) {
    const [showDataList, setShowDataList] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [values, setValues] = useState(defaultValues ?? [])

    const inputClassNames = cn('form-control', style.input, {
        [style['input-invalid']]: (showValidationError && focused)
    })

    const invalidTextClassNames = cn('form-text', {
        [style['show-invalid-text']]: (showValidationError && focused),
        [style['hide-invalid-text']]: !(showValidationError && focused)
    })

    const labelClassNames = cn('form-label', style.label)

    const expandDataList = (e) => {
        setShowDataList(true)
    }

    const closeDataList = (e) => {
        setShowDataList(false)
    }

    const onChangeInput = (e) => {
        const value = e.target.value
        setInputValue(value)
        dispatchDataList(dataList.filter((item) => {
            return item.value.toLowerCase().indexOf(value.toLowerCase()) > -1
        }))
    }

    const clickOnListItem = (value, id) => (e) => {
        if(values.filter(item => item.id === id).length > 0) return;
        setInputValue("")
        dataListOnClick(id)(e)
        setValues([...values, {
            id, value
        }])
    }

    const deleteItem = (id) => (e) => {
        dataListDeleteItem(id)(e)
        setValues(values.filter(item => item.id !== id));
    }

    return (
        <>
            <div className={style['input-container']}>
                <label htmlFor={id} className={labelClassNames}>{label}</label>
                <div className={style['subjects-container']}>
                    {values.map((item) => (
                        <div key={item.id} className={style['subject-item']}>
                            <span>{item.value}</span><span onClick={deleteItem(item.id)} className={style['cursor-pointer']}>&#10006;</span>
                        </div>
                    ))}
                </div>
                <input
                    value={inputValue}
                    onChange={onChangeInput}
                    onClick={expandDataList}
                    onBlur={closeDataList}
                    className={inputClassNames}
                    id={id} />
                {(showValidationError && focused) && (
                    <div className={invalidTextClassNames}>{invalidText}</div>
                )}
                {showDataList && (
                    <ol className="list-group">
                        {changedDataList.map((item) => (
                            
                            <li onMouseDown={clickOnListItem(item.value, item.id)} key={item.id} className="list-group-item list-group-item-action">
                                {item.value}
                            </li>
                        ))}
                    </ol>
                )}

            </div>
        </>
    );
}

export default DataListMultiSelect;