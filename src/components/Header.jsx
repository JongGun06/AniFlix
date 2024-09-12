import React from 'react';
import '../App.css'


const Header = () => {
    return (
        <header>
            <div style={{display: 'flex', alignItems:'center', color: 'white'}}>
            <img className='icon' src={'https://i.pinimg.com/564x/70/4a/e9/704ae92aad506b079982606f108fe592.jpg'} alt="" />
            <h3>  AniFlix</h3>
            </div>
            <a href="/day">График</a>
            <a href="/">Каталог</a>
            <a href="/search">Поиск</a>

        </header>
    );
}

export default Header;
