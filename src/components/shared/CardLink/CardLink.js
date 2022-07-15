import classNames from 'classnames';
import React from 'react'
import style from "./card-link.module.css"
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { CLASSROOM_ROUTE } from '../../../const/routes';

function CardLink() {
    const cardClassNames = cn(style.card, 'card', 'border-secondary', 'mb-3')
    
    return (
        <div className={cardClassNames}>
            <div className="card-header"><b>Кабинеты</b></div>
            <div className="card-body text-secondary">
                <h5 className="card-title"><Link to={CLASSROOM_ROUTE} type="button" className="btn btn-secondary">Открыть список</Link></h5>
                
                <p className="card-text">Всего элементов: 30</p>
            </div>
        </div>
    );
  }
  
  export default CardLink;