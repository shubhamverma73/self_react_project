import React, {createContext} from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';

const localStorageData = createContext();

const Protected = (props) => {
    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    let urlElements = window.location.href.split('/');
    return (
        <>
            <localStorageData.Provider value={localData}> 
                <Header value={urlElements[3]} />
                <Navigation />
                <props.component />
                <Footer value={urlElements[3]} />
            </localStorageData.Provider> 
        </>
    );
}
export default Protected;
export {localStorageData};