import React from 'react';
import Header from '../../shared/Header/Header';

function FilterForm() {
    return (
        <div className="input-group mb-3">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
            <input type="text" className="form-control" aria-label="Text input with dropdown button" />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Поиск</button>
        </div>
    );
}

export default FilterForm;