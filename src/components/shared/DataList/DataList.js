import React, { useState } from 'react'
import cn from 'classnames';
import style from "./data-list.module.css"

function DataList({ id, label, dataList, changedDataList, dataListOnClick, dataListDeleteItem, defaultValue, dispatchDataList, valid, invalidText, focused, showValidationError, onChange, onBlur }) {
    const [showDataList, setShowDataList] = useState(false)
    const [inputValue, setInputValue] = useState(defaultValue ?? "")

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
        if(value.length === 0) {
            dataListDeleteItem(e)
        }
        setInputValue(value)
        dispatchDataList(dataList.filter((item) => {
            return item.value.toLowerCase().indexOf(value.toLowerCase()) > -1
        }))
    }

    const clickOnListItem = (value, id) => (e) => {
        dataListOnClick(id)(e)
        setInputValue(value)
    }

    return (
        <>
            <div className={style['input-container']}>
                <label htmlFor={id} className={labelClassNames}>{label}</label>
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

export default DataList;