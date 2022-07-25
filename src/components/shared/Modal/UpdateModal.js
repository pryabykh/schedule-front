import React from 'react';
import style from './modal.module.css'
import cn from 'classnames'

function UpdateModal(props) {
    return (
        <>
            <div className={style["modal-background"]}>
            </div>
            <div className={cn('modal', 'show', style['create-modal-show'])} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Обновить</h5>
                        </div>
                            {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateModal;