import React from 'react';
import Navigation from './Navigation';

const Protected = (props) => {
    return (
        <>
            <Navigation />
            <props.component />
        </>
    );
}
export default Protected;