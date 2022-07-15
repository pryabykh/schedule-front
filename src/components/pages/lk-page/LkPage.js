import React from 'react';
import CardLink from '../../shared/CardLink/CardLink';
import Header from '../../shared/Header/Header';

function LkPage() {
    return (
        <>
        <Header />
        <h1 className='container'>Личный кабинет</h1>
        <div className='container'>
        <CardLink /> <CardLink /> <CardLink /> <CardLink /> <CardLink />
        </div>
        
        </>
    );
}

export default LkPage;