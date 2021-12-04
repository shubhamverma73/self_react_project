import React from 'react';
import myImg from '../../assets/img/404.jpg';

const NotFound = () => {

    document.title = '404';

    return (
        <div className="not-found">
            <img src={myImg} alt="" />
        </div>
    );
}
export default NotFound;