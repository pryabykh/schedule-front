import React from 'react';
import CardLink from '../../shared/CardLink/CardLink';
import Header from '../../shared/Header/Header';

function SchedulePage() {
    return (
        <>
        <Header />
        <h1 className='container mt-2 mb-2'>Расписание</h1>
        <div className='container'>
        <button type="button" className="btn btn-warning btn-lg mt-2 mb-3">Сформировать расписание</button>
        <CardLink /> <CardLink /> <CardLink /> <CardLink />
        </div>
        
        </>
    );
}

export default SchedulePage;